import apiInstance from "@/lib/api"
import { PaginationResponse, SuccessResponse } from "../types"
import { Travel } from "./types"
import { getSession } from "@/actions/getSession"
import { TravelAgencySchemaType } from "@/lib/types/agency"

export const paginateTravels = async () => {
  const response = await apiInstance.get<any, SuccessResponse<PaginationResponse<Travel>>>(
    `/ms-travels/travel/travel_agent?page_size=100`
  )
  return response.data.data
}

export async function getTravelAgencyDetails(agencyId: string) {
    const session = await getSession();
    const response = await apiInstance.get(`/ms-travels/agency/admin/${agencyId}`);
    console.log("API response:", response);
    const { data } = response;
    console.log("Returned data:", data);
    return data;
}

export async function updateTravelAgency(agency: TravelAgencySchemaType, agencyId: string) {
    const session = await getSession()
    const { data } = await apiInstance.put(`/ms-travels/agency/travel_agent`, agency, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return data
}
// export async function deleteTravelAgency(agencyId: string) {
//     const session = await getSession()
//     const { data } = await apiInstance.delete(`/ms-travels/agency/admin/${agencyId}`)
//     return data
// }
