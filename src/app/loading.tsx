import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <main className="flex h-dvh w-full items-center justify-center">
      <Loader className="size-20 animate-spin" />
    </main>
  )
}
