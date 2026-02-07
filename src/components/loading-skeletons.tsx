import { Skeleton } from '@/components/ui/skeleton'
import { Sidebar } from '@/components/ui/sidebar'
import { SidebarInset } from '@/components/ui/sidebar'

/**
 * Loading skeleton for shop dashboard
 * Displays while data is being fetched
 */
export function ShopLoadingSkeleton() {
  return (
    <Sidebar>
      <div className="flex h-full w-full flex-col">
        {/* Sidebar header */}
        <div className="flex h-16 items-center border-b px-4">
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Sidebar content */}
        <div className="flex-1 space-y-2 p-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Sidebar footer */}
        <div className="border-t p-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>

          {/* Content cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>

          {/* Table */}
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </SidebarInset>
    </Sidebar>
  )
}

/**
 * Loading skeleton for admin dashboard
 */
export function AdminLoadingSkeleton() {
  return (
    <Sidebar>
      <div className="flex h-full w-full flex-col">
        {/* Sidebar header */}
        <div className="flex h-16 items-center border-b px-4">
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Sidebar content */}
        <div className="flex-1 space-y-2 p-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Sidebar footer */}
        <div className="border-t p-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>

          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
        </div>
      </SidebarInset>
    </Sidebar>
  )
}

/**
 * Page-level loading skeleton
 */
export function PageLoadingSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Skeleton className="h-12 w-64" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
        <Skeleton className="h-32 rounded-lg" />
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </div>
  )
}
