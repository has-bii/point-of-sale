import { getShopByUserId } from '@/features/shop/cache/get-shop'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { NavUser } from '../nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../ui/sidebar'
import { ShopSidebarContent } from './shop-sidebar-content'
import ShopSidebarHeader from './shop-sidebar-header'

export default async function ShopSidebar() {
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

  // Get shop
  const shop = await getShopByUserId(session.user.id)

  if (!shop) {
    redirect('/dashboard/create-shop')
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <ShopSidebarHeader shop={shop} />
      </SidebarHeader>
      <SidebarContent>
        <ShopSidebarContent />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
