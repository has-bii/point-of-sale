import { createShopSchema } from '@/features/shop/validation/create-shop'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * Slugify a string for URL-safe usage
 * Converts to lowercase, replaces spaces with hyphens, removes special chars
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * POST /api/shops
 * Create a new shop for the authenticated user
 *
 * Request body:
 * {
 *   "name": "My Shop" // Required, 1-100 characters
 * }
 *
 * Response:
 * {
 *   "message": "ok",
 *   "data": { id, name, slug, ownerId, createdAt, updatedAt }
 * }
 */
export async function POST(request: Request) {
  try {
    // 1. Check authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized', data: null, error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const userId = session.user.id

    // 2. Parse and validate request body
    const body = await request.json()
    const validationResult = createShopSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue) => issue.message)
      return NextResponse.json(
        { message: 'Validation failed', data: null, error: errors },
        { status: 400 },
      )
    }

    const { name } = validationResult.data

    // 3. Generate slug from name
    const slug = slugify(name)

    // 4. Check if user already has a shop (ownerId is unique)
    const existingUserShop = await prisma.shop.findUnique({
      where: { ownerId: userId },
    })

    if (existingUserShop) {
      return NextResponse.json(
        { message: 'User already has a shop', data: null, error: 'User already has a shop' },
        { status: 409 },
      )
    }

    // 5. Check if slug already exists
    const existingSlug = await prisma.shop.findUnique({
      where: { slug },
    })

    if (existingSlug) {
      return NextResponse.json(
        {
          message: 'A shop with this name already exists',
          data: null,
          error: 'A shop with this name already exists',
        },
        { status: 409 },
      )
    }

    // 6. Create the shop
    const shop = await prisma.shop.create({
      data: {
        name,
        slug,
        ownerId: userId,
      },
    })

    // Revalidate the dashboard page
    revalidateTag('shops', 'max')
    revalidateTag(`shop-${userId}`, 'max')

    return NextResponse.json({ message: 'ok', data: shop }, { status: 201 })
  } catch (error) {
    console.error('Error creating shop:', error)

    // Handle Prisma-specific errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: { target?: string[] } }

      // P2002: Unique constraint violation
      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          {
            message: 'A shop with this name or owner already exists',
            data: null,
            error: 'A shop with this name or owner already exists',
          },
          { status: 409 },
        )
      }
    }

    return NextResponse.json(
      { message: 'Internal server error', data: null, error: 'Internal server error' },
      { status: 500 },
    )
  }
}
