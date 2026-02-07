import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '../auth'

export type AuthSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>

/**
 * Get session or redirect to login.
 * Official pattern from Better Auth docs for Next.js.
 *
 * @returns The authenticated user session
 * @throws Redirects to /login if not authenticated
 */
export async function requireAuth(): Promise<AuthSession> {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  return session
}

/**
 * Check if user has specific role.
 *
 * @param session - The user session
 * @param role - The role to check
 * @returns True if user has the specified role
 */
export function hasRole(session: AuthSession, role: string): boolean {
  return session.user.role === role
}

/**
 * Check if user is an admin.
 *
 * @param session - The user session
 * @returns True if user is an admin
 */
export function isAdmin(session: AuthSession): boolean {
  return session.user.role === 'admin'
}

/**
 * Check if user is an owner.
 *
 * @param session - The user session
 * @returns True if user is an owner
 */
export function isOwner(session: AuthSession): boolean {
  return session.user.role === 'owner'
}
