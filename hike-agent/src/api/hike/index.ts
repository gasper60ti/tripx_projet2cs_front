import apiInstance from "@/lib/api"
import { PaginationResponse, SuccessResponse } from "../types"
import { Hike } from "./types"

export const paginateHikes = async () => {
  const response = await apiInstance.get<any, SuccessResponse<PaginationResponse<Hike>>>(
    `/ms-hikes/hike/hike_agent?page_size=100`
  )
  return response.data.data
}
