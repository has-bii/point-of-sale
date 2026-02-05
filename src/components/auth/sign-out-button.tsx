"use client"

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useTransition } from 'react'
import { Loader2, LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
    const [isLoading, startTransition] = useTransition()
    const router = useRouter()

    const handleLogout = () => {
        startTransition(async () => {
            await authClient.signOut()
            router.push('/signin')
        })
    }

    return (
        <Button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? <>
                <Loader2 className="animate-spin" />
                <span>Loading...</span>
            </> :
                <>
                    <LogOutIcon />
                    <span>Sign out</span>
                </>}
        </Button>
    )
}
