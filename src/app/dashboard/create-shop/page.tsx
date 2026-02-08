import { getShopByUserId } from '@/features/shop/cache/get-shop'
import CreateShopForm from '@/features/shop/components/create-shop-form'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function CreateShopPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  // Check if user has shop
  const shop = await getShopByUserId(session.user.id)

  if (shop) {
    redirect('/dashboard')
  }

  return (
    <main className="flex h-dvh w-full items-center justify-center p-4">
      <CreateShopForm />
    </main>
  )
}
