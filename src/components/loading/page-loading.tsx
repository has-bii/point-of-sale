import { Loader } from 'lucide-react'

export default function PageLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loader className="size-12 animate-spin" />
      <p className="text-muted-foreground text-base font-medium">Loading...</p>
    </div>
  )
}
