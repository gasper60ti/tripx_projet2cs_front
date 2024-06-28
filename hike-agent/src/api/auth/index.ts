import guestApi from "@/lib/guest.api"
import { ChangePasswordSchemaType, ForgotPasswordSchemaType, LoginSchemaType } from "@/lib/types/user"

export async function login(user: LoginSchemaType) {
  const { data } = await guestApi.post("/ms-users/auth/login/hike", user)
  const res = await guestApi.get("/ms-hikes/agency/hike_agent", {
    headers: {
      Authorization: `Bearer ${data.data.token}`
    }
  })

  return {
    user: data.data.user,
    token: data.data.token,
    agency: res.data.data
  }
}

export function sendResetPasswordEmail(data: ForgotPasswordSchemaType) {
  return guestApi.post("/ms-users/password/send", data)
}

export function resetPassword(data: ChangePasswordSchemaType & ForgotPasswordSchemaType) {
  return guestApi.post("/ms-users/password/reset", data)
}
