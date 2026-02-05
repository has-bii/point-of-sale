import { authClient } from '@/lib/auth-client'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/auth/sign-out-button'

export default async function DashboardPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers()
    },
  })

  if (!session.data) {
    redirect('/signin')
  }

  return (
    <div className="min-h-screen bg-[oklch(0.1904_0.0235_119.3763)]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[oklch(0.2197_0.0299_119.6586)] border border-[oklch(0.341_0.0453_119.5902)] rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to your Dashboard
          </h1>
          <p className="text-[oklch(0.7909_0.0322_117.8113)] mb-4">
            You are signed in as:{' '}
            <span className="text-[oklch(0.6729_0.152_122.4786)] font-medium">
              {session.data.user.email}
            </span>
          </p>
          <div className="flex gap-4">
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  )
}
