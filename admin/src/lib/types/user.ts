import { ChangePasswordSchema, ForgotPasswordSchema, LoginSchema } from "@/lib/schemas/user"
import * as z from "zod"

export type LoginSchemaType = z.infer<typeof LoginSchema>
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>
export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>
export type ProfilePictureType = { profile_picture: File }
