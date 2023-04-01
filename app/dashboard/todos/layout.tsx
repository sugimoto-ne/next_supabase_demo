import { TodoForm } from '../../components/TodoForm'

export default async function TodoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <aside className={`w-1/3 h-[calc(100vh-68px)] border-r border-gray-200 pt-6 bg-gray-100`}>
        <TodoForm />
      </aside>
      <main className="w-2/3 justify-center">{children}</main>
    </section>
  )
}