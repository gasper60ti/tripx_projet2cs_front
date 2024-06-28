import * as z from "zod"
import { AddHikingAgencySchema, AddTravelAgencySchema } from "../schemas/agency"

export type AddTravelAgencySchemaType = z.infer<typeof AddTravelAgencySchema>
export type AddHikingAgencySchemaType = z.infer<typeof AddHikingAgencySchema>
