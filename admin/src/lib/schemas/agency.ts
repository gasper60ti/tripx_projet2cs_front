import * as z from "zod"
const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
export interface SocialMedia {}

const logoValidation = z.instanceof(File).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
  message: "Invalid file type. Accepted types are jpeg, jpg, png, webp."
})
export const AddTravelAgencySchema = z.object({
  name: z.string().min(1, { message: "Travel Agency Name is required" }),
  logo: logoValidation,
  contact_email: z.string().email().min(1, { message: "Contact Email is required" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  address: z.string().min(1, { message: "Address is required" }),
  social_media: z.record(z.string()).default({}),

  reviews_count: z.number().default(0),
  is_complete: z.boolean().default(true),
  description: z.string().min(1, { message: "Description is required" })
})

export const AddHikingAgencySchema = z.object({
  name: z.string().min(1, { message: "Hiking Agency Name is required" }),
  logo: logoValidation,
  contact_email: z.string().email().min(1, { message: "Contact Email is required" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  address: z.string().min(1, { message: "Address is required" }),
  social_media: z.record(z.string()).default({}),

  reviews_count: z.number().default(0),
  is_complete: z.boolean().default(true),
  description: z.string().min(1, { message: "Description is required" })
})
