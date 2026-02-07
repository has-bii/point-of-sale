'use client'

import { ApiError } from '@/types/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createShopApi } from '../api'
import { CreateShopInput, createShopSchema } from '../validation/create-shop'

export const useCreateShopForm = () => {
  const form = useForm<CreateShopInput>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      name: '',
    },
  })

  const mutation = useMutation({
    mutationFn: createShopApi,
    onError: (error) => {
      let message = 'Failed to create shop. Please try again.'
      if (isAxiosError<ApiError>(error)) {
        message = error.response?.data.message || message
      }
      toast.error(message)
    },
    onSettled: () => {
      form.reset()
    },
  })

  const { isPending } = mutation

  return { form, mutation, isPending }
}
