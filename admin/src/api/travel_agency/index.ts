import apiInstance from "@/lib/api"
import { PaginationResponse, SuccessResponse } from "../types"
import { TravelAgency } from "./types"

export const paginateTravelAgencies = async () => {
  const response = await apiInstance.get<any, SuccessResponse<PaginationResponse<TravelAgency>>>(
    `/ms-travels/agency/admin?page_size=100`
  )
  return response.data.data
}
