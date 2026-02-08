import AdminSidebar from '@/components/admin-sidebar/admin-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
