import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
}

interface NavItemsProps {
  items: NavItem[]
  label?: string
}

export function NavItems({ items, label }: NavItemsProps) {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton key={item.title} asChild isActive={item.isActive}>
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
