'use client'
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Database } from "../../../../../database.types"

type Todo = Database["public"]["Tables"]["todos"]["Row"]

export default function TodoEditForm({ todo }: {todo: Todo}) {
  const router = useRouter()
  const [title, setTitle] = useState<string|null>(null)
  const [description, setDescription] = useState<string|null>(null)

  useEffect(() => {
    setDescription(todo.description)
    setTitle(todo.title)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch(`/dashboard/todos/${todo.id}/api`, {
      method: 'PUT',
      body: JSON.stringify({
        id: todo.id,
        title,
        description
      }),
    }
    )

    const data = await res.json()

    if(!res.ok){
      toast.error("create error")
      return
    }
    router.refresh()
    toast.success(`updated: ${data[0].title}`)
  }

  const deleteTodo = async () => {
    const answer = confirm(`${todo.title}を削除しますか？`)
    if (!answer) return

    const res = await fetch(`/dashboard/todos/${todo.id}/api`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: todo.id,
      })
    })

    if(!res.ok){
      toast.error("create error")
      return
    }
    toast.success('deleted: ' + todo.title)
    router.refresh()
    router.push('/dashboard/todos')
  }

  return (
    <form className='p-8 border-2' onSubmit={handleSubmit}>
      <p>id: {todo.id}</p>
      <p>status: {todo.done ? 'done' : 'todo'}</p>
      <p>{format(new Date(todo.created_at), 'yyyy-MM-dd HH:mm:ss')}に作成</p>

      <div className='py-4'>
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-black">title</label>
        <input
          value={title ?? ''}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          className="block w-full p-2 text-gray-700 border border-gray-200 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className='py-4'>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-black">description</label>
        <textarea
          id="description"
          value={description ?? ''}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-700 bg-whiterounded-lg border rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <div className='text-center'>
        <button type="button" onClick={deleteTodo} className='bg-red-500 text-white rounded-lg px-4 py-2 mx-2'>削除</button>
        <button type="submit" className='bg-blue-500 text-white rounded-lg px-4 py-2 mx-2'>更新</button>
      </div>
    </form>
  )
}