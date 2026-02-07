/**
 * Application-wide constants
 *
 * Centralized location for route paths, role definitions, and other
 * constant values to avoid magic strings and improve maintainability.
 */

/**
 * Route paths used throughout the application
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DASHBOARD_ADMIN: '/dashboard/admin',
  DASHBOARD_SHOP: '/dashboard/shop',
  DASHBOARD_CREATE_SHOP: '/dashboard/create-shop',
  DASHBOARD_SHOP_PRODUCTS: '/dashboard/shop/products',
} as const

/**
 * User roles with hierarchy
 * Higher index = higher privilege level
 */
export const ROLES = {
  USER: 'user',
  OWNER: 'owner',
  ADMIN: 'admin',
} as const

/**
 * Role hierarchy for permission checking
 */
export const ROLE_HIERARCHY: readonly string[] = [
  ROLES.USER,
  ROLES.OWNER,
  ROLES.ADMIN,
] as const

/**
 * Type for role values
 */
export type Role = (typeof ROLES)[keyof typeof ROLES]

/**
 * Session configuration constants
 */
export const SESSION = {
  /** Session duration in milliseconds (8 hours for work shift) */
  DURATION: 60 * 60 * 8,
  /** Session refresh interval in milliseconds (1 hour) */
  REFRESH_INTERVAL: 60 * 60,
} as const

/**
 * Rate limiting configuration
 */
export const RATE_LIMIT = {
  /** Time window in seconds */
  WINDOW: 60,
  /** Maximum requests per window */
  MAX_REQUESTS: 10,
} as const

/**
 * Cache configuration
 */
export const CACHE = {
  /** Default stale time in milliseconds (1 minute) */
  STALE_TIME: 60 * 1000,
  /** Default cache time in milliseconds (5 minutes) */
  CACHE_TIME: 5 * 60 * 1000,
  /** Default revalidation time in seconds */
  REVALIDATE: 60,
} as const

/**
 * Helper function to check if a role has sufficient privilege level
 *
 * @param userRole - The user's role
 * @param requiredRole - The minimum required role
 * @returns True if user has sufficient privileges
 */
export function hasSufficientRole(
  userRole: string,
  requiredRole: string,
): boolean {
  const userLevel = ROLE_HIERARCHY.indexOf(userRole)
  const requiredLevel = ROLE_HIERARCHY.indexOf(requiredRole)
  return userLevel >= requiredLevel && userLevel !== -1
}
