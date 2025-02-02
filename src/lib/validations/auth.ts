import * as z from "zod"

export const loginSchema = z.object({
  nationalId: z
    .string()
    .min(13, "เลขบัตรประชาชนต้องมี 13 หลัก")
    .max(13, "เลขบัตรประชาชนเกิน 13 หลัก"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
  remember: z.boolean().default(false),
})

export const registerSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อ-นามสกุล"),
  nationalId: z.string().min(13, "เลขบัตรประชาชนต้องมี 13 หลัก").max(13),
  phone: z.string().min(9, "เบอร์โทรต้องมีอย่างน้อย 9 หลัก").max(10),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
  isShop: z.boolean().default(false),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>
