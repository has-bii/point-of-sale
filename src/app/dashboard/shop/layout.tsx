import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import ShopSidebar from '@/components/shop-sidebar/shop-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getQueryClient } from '@/lib/react-query'

type Props = {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const queryClient = getQueryClient()
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Prefetch shop data for client components
  if (session?.user?.id) {
    const { getShopByUserId } = await import('@/features/shop/cache/get-shop')
    queryClient.prefetchQuery({
      queryKey: ['shop', session.user.id],
      queryFn: () => getShopByUserId(session.user.id),
    })
  }

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <SidebarProvider>
        <ShopSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  )
}
