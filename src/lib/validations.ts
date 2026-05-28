import { z } from 'zod'

export const customerFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(100),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(100),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  nationalId: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal(''))
})

export type CustomerFormData = z.infer<typeof customerFormSchema>
