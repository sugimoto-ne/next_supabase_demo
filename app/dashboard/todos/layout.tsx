import { Suspense } from 'react'
import { Skelton } from '../../components/Skelton'
import { TodoForm } from '../../components/TodoForm'
import { TodoList } from './components/TodoList'

export default async function TodoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <aside className={`w-1/4 h-[calc(100vh-68px)] border-r border-gray-200 pt-6 bg-gray-100 px-3`}>
        <TodoForm />

        <Suspense fallback={<Skelton />}>
          {/* @ts-ignore */}
          <TodoList />
        </Suspense>
      </aside>
      <main className="w-3/4 justify-center">{children}</main>
    </section>
  )
}