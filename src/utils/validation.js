import { z } from 'zod'

export const emailSchema = z.string().min(1, { message: 'Không được để trống' }).email()
export const genderSchema = z.enum(['Nam', 'Nu', 'Khac'], {
  required_error: 'Vui lòng chọn giới tính',
})
export const requiredStringSchema = z.string().min(1, { message: 'Không được để trống' })
export const dateOfBirthSchema = z.string().refine((value) => {
  const date = new Date(value)
  return !Number.isNaN(date.getTime())
}, { message: 'Ngày sinh không hợp lệ' })

export const nameSchema = z
  .string()
  .min(2, { message: 'Tên phải có ít nhất 2 ký tự' })
  .max(50, { message: 'Tên không được vượt quá 50 ký tự' })

export const passwordSchema = z
  .string()
  .min(1, { message: 'Không được để trống' })
  .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  .max(32, { message: 'Mật khẩu không được vượt quá 32 ký tự' })

export const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  dateOfBirth: dateOfBirthSchema,
  gender: genderSchema,
})

export function validateUser(data) {
  return userSchema.safeParse(data)
}
