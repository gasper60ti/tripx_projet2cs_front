import { AddHikingAgencySchemaType, AddTravelAgencySchemaType } from "@/lib/types/agency"
import { getSession } from "./getSession"
import apiInstance from "@/lib/api"

export async function addTravelAgency(agency: AddTravelAgencySchemaType) {
  const session = await getSession()
  const { data } = await apiInstance.post("/ms-travels/agency/admin", agency, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return data
}

export async function addHikingAgency(agency: AddHikingAgencySchemaType) {
  const session = await getSession()
  const { data } = await apiInstance.post("/ms-hikes/agency/admin", agency, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return data
}

export async function getTravelAgencyDetails(agencyId: string) {
    const session = await getSession();
    const response = await apiInstance.get(`/ms-travels/agency/admin/${agencyId}`);
    console.log("API response:", response);
    const { data } = response;
    console.log("Returned data:", data);
    return data;
}

export async function updateTravelAgency(agency: AddTravelAgencySchemaType, agencyId: string) {
    const session = await getSession()
    const { data } = await apiInstance.put(`/ms-travels/agency/admin/${agencyId}`, agency, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return data
}
export async function deleteTravelAgency(agencyId: string) {
    const session = await getSession()
    const { data } = await apiInstance.delete(`/ms-travels/agency/admin/${agencyId}`)
    return data
}

export async function getHikingAgencyDetails(agencyId: string) {
    const session = await getSession();
    const response = await apiInstance.get(`/ms-hikes/agency/admin/${agencyId}`);
    console.log("API response:", response);
    const { data } = response;
    console.log("Returned data:", data);
    return data;
}

export async function updateHikingAgency(agency: AddHikingAgencySchemaType, agencyId: string) {
    const session = await getSession()
    const { data } = await apiInstance.put(`/ms-hikes/agency/admin/${agencyId}`, agency, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return data
}
export async function deleteHikingAgency(agencyId: string) {
    const session = await getSession()
    const { data } = await apiInstance.delete(`/ms-hikes/agency/admin/${agencyId}`)
    return data
}