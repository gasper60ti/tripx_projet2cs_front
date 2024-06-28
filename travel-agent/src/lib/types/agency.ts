import * as z from "zod"
import { TravelAgencySchema } from "../schemas/agency"

export type TravelAgencySchemaType = z.infer<typeof TravelAgencySchema>
