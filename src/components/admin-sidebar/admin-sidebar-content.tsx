'use client'

import { SidebarGroup, SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar'
import { Home, type LucideIcon, Store, Users } from 'lucide-react'
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
    url: '/dashboard/admin',
    icon: Home,
  },
  {
    title: 'Users',
    url: '/dashboard/admin/users',
    icon: Users,
  },
  {
    title: 'Shops',
    url: '/dashboard/admin/shops',
    icon: Store,
  },
]

export function AdminSidebarContent() {
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
