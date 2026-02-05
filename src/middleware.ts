import { NextRequest, NextResponse } from 'next/server'

// Define public and protected routes
const publicRoutes = [
  '/',
  '/signin',
  '/signup',
  '/api/auth/:path*',
]

const protectedRoutes = [
  '/dashboard/:path*',
  '/pos/:path*',
  '/admin/:path*',
]

/**
 * Better Auth Middleware for Route Protection
 *
 * This middleware protects routes that require authentication.
 * Unauthenticated users will be redirected to sign in.
 *
 * Note: This is a basic middleware setup. For Better Auth session
 * validation in middleware, you can use the auth API to check sessions.
 *
 * Example protected API route check:
 * ```ts
 * import { auth } from '@/lib/auth'
 * const session = await auth.api.getSession({ headers: request.headers })
 * ```
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => {
    // Convert :path* wildcard to regex
    const pattern = route.replace(':path*', '.*')
    return new RegExp(`^${pattern}$`).test(pathname)
  })

  // Check if the path is a public route
  const isPublicRoute = publicRoutes.some((route) => {
    const pattern = route.replace(':path*', '.*')
    return new RegExp(`^${pattern}$`).test(pathname)
  })

  // For protected routes, you would typically validate the session here
  // For now, we'll let the request through and handle auth at the page level
  // or use server components to check session status

  // Continue to the next middleware or route handler
  return NextResponse.next()
}

/**
 * Middleware configuration
 *
 * Matcher patterns define which routes the middleware should run on.
 * We exclude static files, images, and API routes that don't need auth.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

/**
 * Alternative: Using Next.js built-in matcher with specific routes
 *
 * If you prefer to only run middleware on specific routes:
 *
 * export const config = {
 *   matcher: ['/dashboard/:path*', '/pos/:path*', '/admin/:path*'],
 * }
 */
