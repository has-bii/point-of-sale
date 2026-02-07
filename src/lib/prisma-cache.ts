import { unstable_cache } from 'next/cache'
import prisma from './prisma'

/**
 * Cached shop lookup by user ID.
 * Cache is invalidated when shop data changes via revalidateTag.
 *
 * @param userId - The user ID to look up shop for
 * @returns The shop or null if not found
 */
export const getCachedShopByUserId = unstable_cache(
  async (userId: string) => {
    return prisma.shop.findUnique({
      where: { ownerId: userId },
    })
  },
  ['shop-by-user-id'],
  {
    revalidate: 60, // Revalidate every 60 seconds
    tags: ['shops'],
  },
)

/**
 * Cached shop lookup by slug.
 * Cache is invalidated when shop data changes via revalidateTag.
 *
 * @param slug - The shop slug to look up
 * @returns The shop or null if not found
 */
export const getCachedShopBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.shop.findUnique({
      where: { slug },
    })
  },
  ['shop-by-slug'],
  {
    revalidate: 60,
    tags: ['shops'],
  },
)

/**
 * Cached user lookup with shop relation.
 * Cache is invalidated when user or shop data changes.
 *
 * @param userId - The user ID to look up
 * @returns The user with shop or null if not found
 */
export const getCachedUserWithShop = unstable_cache(
  async (userId: string) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: { shops: true },
    })
  },
  ['user-with-shop'],
  {
    revalidate: 60,
    tags: ['users', 'shops'],
  },
)
