import { Skeleton } from '@/components/ui/skeleton'

export default function CreateShopLoading() {
  return (
    <main className="bg-muted/40 flex h-dvh w-full items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-8 shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>

            <Skeleton className="h-10 w-full" />
          </div>

          {/* Footer */}
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </main>
  )
}
