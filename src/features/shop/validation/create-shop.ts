import { z } from 'zod'

export const createShopSchema = z.object({
  name: z
    .string()
    .min(1, { error: 'Shop name is required' })
    .max(100, { error: 'Shop name must be less than 100 characters' }),
})

export type CreateShopInput = z.infer<typeof createShopSchema>
