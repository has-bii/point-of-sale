import { AppSidebar } from '@/components/app-sidebar'
import ShopSidebar from '@/components/shop-sidebar/shop-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <ShopSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
