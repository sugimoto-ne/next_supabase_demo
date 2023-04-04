'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Database } from "../../../../database.types"
import { toast } from "react-toastify"


type Todo = Database["public"]["Tables"]["todos"]["Row"]

export default function TodoListItem ({todo}: {todo: Todo}) {
  const router = useRouter()
  const updateDone = async (done:boolean) => {
    const res = await fetch(`/dashboard/todos/${todo.id}/api`, {
      method: 'POST',
      body: JSON.stringify({
        id: todo.id,
        done
      }),
    }
    )

    const data = await res.json()

    if(!res.ok){
      toast.error("update error")
      return
    }
    router.refresh()
    toast.success(`updated status: ${data[0].title}`)
  }

  return (
    <li className="flex items-center">
      <input type="checkbox" className='mx-2' 
      checked={todo.done}
      onChange={(e) => updateDone(!todo.done)}
      />
      <Link href={`/dashboard/todos/${todo.id}`}>
      {todo.title}
      </Link>
    </li>
  )
}
