import { Shop } from '@/generated/prisma/client'
import { axios } from '@/lib/axios'
import { ApiResponse } from '@/types/api'
import { isAxiosError } from 'axios'
import { cacheTag } from 'next/cache'

export const getShopByUserId = async (userId: string): Promise<Shop | null> => {
  'use cache'
  cacheTag('shops', `shop-${userId}`)

  try {
    const response = await axios.get<ApiResponse<Shop>>(`/shops/user/${userId}`)
    return response.data.data
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null
      }
    }
    throw error
  }
}
