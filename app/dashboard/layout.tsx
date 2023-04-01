import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex">
      <aside className={`w-1/6 bg-white h-[calc(100vh-68px)] border border-gray-200 pt-6  flex flex-col`}>
        <Link className='text-blue-500 p-2' href="/dashboard">dashboard</Link>
       
        <Link className='text-blue-500 p-2' href="/dashboard/todos">Todo</Link>
      </aside>
      <main className="flex-1 justify-center">{children}</main>
    </section>
  )
}