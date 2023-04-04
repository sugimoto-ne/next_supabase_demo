import { notFound } from 'next/navigation'
import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../../../../database.types'
import TodoEditForm from './components/TodoEditForm'

export const revalidate = 0

type PageProps = {
  params: {
    todoId: string
  }
}


export default async function page({ params }: PageProps) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: todo, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', params.todoId)
    .single()

  if (!todo) return notFound()

  if (error !== null) {
    throw error
  }

  return (
    <div className="mt-16 p-8">
      <TodoEditForm todo={todo}/>
    </div>
  )
}