'use client'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

export const TodoForm = () => {
  const [title, setTitle] = useState<string>("")
  const router = useRouter()
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch("/dashboard/todos/new", {
      method: 'POST',
      body: JSON.stringify({
        title
      }),
    })

    const data = await res.json()

    if(!res.ok || data?.length === 0){
      toast.error("create error")
      return
    }
    router.refresh()
    toast.success(`created: ${data[0].title}`)
    setTitle("")

  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none"
        placeholder="todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 "
      >
        Create
      </button>
    </form>
  )
}
