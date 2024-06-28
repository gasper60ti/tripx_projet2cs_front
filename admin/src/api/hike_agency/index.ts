import apiInstance from "@/lib/api"
import { PaginationResponse, SuccessResponse } from "../types"
import { HikeAgency } from "./types"

export const paginateHikeAgencies = async () => {
  const response = await apiInstance.get<any, SuccessResponse<PaginationResponse<HikeAgency>>>(
    `/ms-hikes/agency/admin?page_size=100`
  )
  return response.data.data
}
