import AdminSidebar from '@/components/admin-sidebar/admin-sidebar'
import DashboardSkeletons from '@/components/loading/dashboard-skeletons'
import ShopSidebar from '@/components/shop-sidebar/shop-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getShopByUserId } from '@/features/shop/cache/get-shop'
import CreateShopForm from '@/features/shop/components/create-shop-form'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
}

async function getUserSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  return session
}

async function DashboardContent({ children }: Props) {
  const session = await getUserSession()

  // Check user role
  if (session.user.role === 'admin') {
    return (
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    )
  }

  // Get user shop
  const shop = await getShopByUserId(session.user.id)

  if (shop) {
    return (
      <SidebarProvider>
        <ShopSidebar shop={shop} user={session.user} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    )
  }

  return (
    <main className="flex h-dvh w-full items-center justify-center p-4">
      <CreateShopForm />
    </main>
  )
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Suspense fallback={<DashboardSkeletons />}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  )
}
