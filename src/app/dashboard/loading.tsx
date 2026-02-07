import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
  return (
    <SidebarProvider>
      <Sidebar>
        {/* Sidebar skeleton */}
        <div className="flex h-full w-full flex-col">
          <SidebarHeader className="border-b">
            <div className="flex h-16 items-center gap-2 px-4">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-5 w-32" />
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </SidebarContent>
        </div>

        {/* Main content skeleton */}
        <main className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
          <Skeleton className="h-64 rounded-lg" />
        </main>
      </Sidebar>
    </SidebarProvider>
  )
}
