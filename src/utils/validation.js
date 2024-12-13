import { z } from 'zod'

export const emailSchema = z.string().min(1, { message: 'This field is required' }).email()
export const genderSchema = z.enum(['Male', 'Female'], {
  required_error: 'Please select a gender',
})
export const requiredStringSchema = z.string().min(1, { message: 'This field is required' })

export const nameSchema = z
  .string()
  .min(2, { message: 'Name must be at least 2 characters long' })
  .max(50, { message: 'Name cannot exceed 50 characters' })

export const passwordSchema = z
  .string()
  .min(1, { message: 'This field is required' })
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(32, { message: 'Password cannot exceed 32 characters' })

export const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  age: z.number().min(18, { message: 'You must be over 18 years old' }),
})

export function validateUser(data) {
  return userSchema.safeParse(data)
}
