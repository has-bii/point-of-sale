import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params
  try {
    const shop = await prisma.shop.findUnique({
      where: {
        ownerId: userId,
      },
    })

    if (!shop) {
      return NextResponse.json({ message: 'Shop not found', data: null }, { status: 404 })
    }

    return NextResponse.json({ message: 'ok', data: shop }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal server error', data: null }, { status: 500 })
  }
}
