'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateShopForm } from '../mutation'
import { CreateShopInput } from '../validation/create-shop'

export default function CreateShopForm() {
  const router = useRouter()
  const { form, isPending, mutation } = useCreateShopForm()

  const onSubmit = (data: CreateShopInput) => {
    mutation.mutate(data, {
      onSuccess: (data) => {
        toast.success('Shop created successfully')
        router.push(`/dashboard/${data.data.slug}`)
      },
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create your shop</CardTitle>
        <CardDescription>Enter your shop name to get started with your POS system</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Shop name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your shop name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                Create shop
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
