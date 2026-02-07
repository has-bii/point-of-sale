import SignInForm from '@/features/auth/components/sign-in-form'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="bg-primary/20 absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full opacity-20 blur-3xl" />
      </div>

      <SignInForm />
    </div>
  )
}
