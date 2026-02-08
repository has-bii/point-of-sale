import { getShopByUserId } from '@/features/shop/cache/get-shop'
import { Shop } from '@/generated/prisma/client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { NavUser } from '../nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../ui/sidebar'
import { ShopSidebarContent } from './shop-sidebar-content'
import ShopSidebarHeader from './shop-sidebar-header'

interface Props {
  shop: Shop
  user: {
    name: string
    email: string
    image?: string | null
  }
}

export default function ShopSidebar({ shop, user }: Props) {
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
