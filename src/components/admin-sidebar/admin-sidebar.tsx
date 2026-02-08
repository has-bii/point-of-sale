import { getShopByUserId } from '@/features/shop/cache/get-shop'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { NavUser } from '../nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../ui/sidebar'
import { AdminSidebarContent } from './admin-sidebar-content'
import AdminSidebarHeader from './admin-sidebar-header'

export default async function AdminSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect('/login')
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
    avatar: session.user.image || undefined,
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <AdminSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <AdminSidebarContent />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
