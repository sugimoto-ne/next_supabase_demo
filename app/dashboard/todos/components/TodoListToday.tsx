import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../../database.types'
import TodoListItem from './TodoListItem'

export const TodoListToday = async () => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const user = await supabase.auth.getUser()

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.data.user?.id)
    .gte('created_at', startOfToday.toISOString())
    .lte('created_at', endOfToday.toISOString())
    .order("created_at", { ascending: true, nullsFirst: true })


  return (
    <div>
      <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
        {
          data?.length ? data.map((todo) => <TodoListItem key={todo.id} todo={todo}/>) : <li>no data</li>
        }

      </ul>
    </div>
  )
}
