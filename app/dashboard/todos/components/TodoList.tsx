import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../../database.types'
import TodoListItem from './TodoListItem'

export const TodoList = async () => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const user = await supabase.auth.getUser()


  const { data } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.data.user?.id)
    .order("created_at", { ascending: true, nullsFirst: true })

  return (
    <div>
      <ul className="max-w-md space-y-1 text-gray-700 list-inside">
        {
          data?.length ? data.map((todo) => <TodoListItem key={todo.id} todo={todo}/>) : <li>no data</li>
        }

      </ul>
    </div>
  )
}
