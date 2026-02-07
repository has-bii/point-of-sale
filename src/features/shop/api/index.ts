import { Shop } from '@/generated/prisma/client'
import { axios } from '@/lib/axios'
import { ApiResponse } from '@/types/api'

import { CreateShopInput } from '../validation/create-shop'

export const createShopApi = async (data: CreateShopInput) => {
  const response = await axios.post<ApiResponse<Shop>>('/shops', data)
  return response.data
}
