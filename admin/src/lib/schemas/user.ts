import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" })
})

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email()
})

export const ChangePasswordSchema = z
  .object({
    password: z.string().min(6),
    confirm_password: z.string().min(6),
    code: z.string().length(6)
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"]
  })
