import guestApi from "@/lib/guest.api"
import { ChangePasswordSchemaType, ForgotPasswordSchemaType, LoginSchemaType } from "@/lib/types/user"

export async function login(user: LoginSchemaType) {
  const { data } = await guestApi.post("/ms-users/auth/login/admin", user)
  return data
}

export function sendResetPasswordEmail(data: ForgotPasswordSchemaType) {
  return guestApi.post("/ms-users/password/send", data)
}

export function resetPassword(data: ChangePasswordSchemaType & ForgotPasswordSchemaType) {
  return guestApi.post("/ms-users/password/reset", data)
}
