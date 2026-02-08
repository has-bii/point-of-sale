import Header from '@/components/header'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4">Dashboard</main>
    </>
  )
}
