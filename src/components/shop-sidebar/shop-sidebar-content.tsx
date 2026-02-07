'use client'

import { SidebarGroup, SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar'
import { Home, type LucideIcon, Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

const items: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/shop',
    icon: Home,
  },
  {
    title: 'Products',
    url: '/dashboard/shop/products',
    icon: Package,
  },
]

export function ShopSidebarContent() {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton key={item.title} asChild isActive={pathname === item.url}>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
