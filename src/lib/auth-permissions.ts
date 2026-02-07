import { createAccessControl } from 'better-auth/plugins'
import { ROLES, hasSufficientRole } from './constants'

/**
 * Role-Based Access Control (RBAC) Configuration
 *
 * This module defines the access control rules for the application using
 * Better Auth's access control plugin.
 */

/**
 * Better Auth access control instance
 * The statement is kept minimal as Better Auth's types are strict
 */
const statement = {} as const

export const ac = createAccessControl(statement)

/**
 * Role definitions for Better Auth
 */
export const admin = ac.newRole(ROLES.ADMIN)
export const owner = ac.newRole(ROLES.OWNER)
export const user = ac.newRole(ROLES.USER)

/**
 * Permission checking utilities
 *
 * These functions provide runtime permission checking based on roles.
 * Better Auth's access control plugin handles the auth-side permissions.
 */

/**
 * Permission matrix for application-level authorization
 * Defines what each role can do for each resource/action combination
 */
const PERMISSION_MATRIX = {
  [ROLES.ADMIN]: {
    // Admins can do everything
    shop: { create: true, read: true, update: true, delete: true, manage: true },
    products: { create: true, read: true, update: true, delete: true, manage: true },
    users: { create: true, read: true, update: true, delete: true, manage: true },
    orders: { create: true, read: true, update: true, delete: true, manage: true },
  },
  [ROLES.OWNER]: {
    // Owners can manage their own shop
    shop: { create: true, read: true, update: true, delete: false, manage: true },
    products: { create: true, read: true, update: true, delete: true, manage: true },
    users: { create: false, read: true, update: false, delete: false, manage: false },
    orders: { create: true, read: true, update: true, delete: true, manage: true },
  },
  [ROLES.USER]: {
    // Users have limited access
    shop: { create: false, read: true, update: false, delete: false, manage: false },
    products: { create: false, read: true, update: false, delete: false, manage: false },
    users: { create: false, read: false, update: false, delete: false, manage: false },
    orders: { create: true, read: true, update: false, delete: false, manage: false },
  },
} as const

type Resource = 'shop' | 'products' | 'users' | 'orders'
type Action = 'create' | 'read' | 'update' | 'delete' | 'manage'

/**
 * Check if a user has permission for a specific action on a resource
 *
 * @param userRole - The user's role
 * @param resource - The resource being accessed
 * @param action - The action being performed
 * @returns True if the user has permission
 */
export function hasPermission(
  userRole: string,
  resource: string,
  action: string,
): boolean {
  // Admins have permission for everything
  if (userRole === ROLES.ADMIN) {
    return true
  }

  // Check if the role exists in the permission matrix
  const rolePermissions = PERMISSION_MATRIX[userRole as keyof typeof PERMISSION_MATRIX]
  if (!rolePermissions) {
    return false
  }

  // Check if the resource exists for the role
  const resourcePermissions = rolePermissions[resource as Resource]
  if (!resourcePermissions) {
    return false
  }

  // Check if the action is allowed
  return resourcePermissions[action as Action] === true
}

/**
 * Check if a user can manage a specific shop
 * Admins can manage any shop, owners can only manage their own
 *
 * @param userRole - The user's role
 * @param userId - The user's ID
 * @param shopOwnerId - The shop owner's ID
 * @returns True if the user can manage the shop
 */
export function canManageShop(
  userRole: string,
  userId: string,
  shopOwnerId: string,
): boolean {
  // Admins can manage any shop
  if (userRole === ROLES.ADMIN) {
    return true
  }

  // Owners can only manage their own shop
  if (userRole === ROLES.OWNER) {
    return userId === shopOwnerId
  }

  // Users cannot manage shops
  return false
}

/**
 * Check if a user has sufficient role level
 * Re-exported from constants for convenience
 *
 * @param userRole - The user's role
 * @param requiredRole - The minimum required role
 * @returns True if user has sufficient privileges
 */
export { hasSufficientRole }
