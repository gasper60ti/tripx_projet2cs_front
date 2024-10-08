"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { FiPlus } from "react-icons/fi"
import Link from "next/link"
import usePagination from "@/lib/hooks/usePagination"
import { paginateTravelAgencies } from "@/api/travel_agency"
import { TravelAgencies } from "@/components/TravelAgencies"
export default function TravelAgenciesPage() {
  const { data, isLoading } = usePagination({
    fetchMethod: paginateTravelAgencies,
    queryKey: "travels"
  })

  const TravelAgenciesData = data.map((agency) => {
    return {
      id: agency._id,
      name: agency.name,
      email: agency.contact_email,
      phone: agency.phone,
      location: agency.address,
      status: agency.is_complete ? "active" : "inactive"
    }
  })

  return (
    <>
      <div className="flex justify-between">
        <div className="flex-1 space-y-1">
          <h1 className="text-3xl font-black leading-none tracking-tight">Travel Agencies registred to TripX</h1>
          <h3 className="text-lg tracking-tight  text-gray-500">View all the current agencies details</h3>
        </div>
        <Link href={"/travel-agencies/add-agency"}>
          <Button size={"xl2"} variant={"primary"}>
            <FiPlus className="mr-1 h-6 w-6" />
            Add Travel Agency
          </Button>
        </Link>
      </div>
      {/* DASHBOARD CONTENT */}
      <div className="flex-1 space-y-4 pb-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* LIST OF Latest Travel Agencies */}
          {/* EACH ROW: NAME, EMAIL, LOCATION, PHONE */}
          <Card className="col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Travel Agencies</CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              {/* LIST TRAVEL */}
              {isLoading ? (
                <div className="p-10 text-center text-xl font-medium">Loading...</div>
              ) : (
                <TravelAgencies data={TravelAgenciesData} pageSize={10} />
              )}
            </CardContent>
          </Card>
          {/* LIST OF Latest Hike Agencies */}
        </div>
      </div>
    </>
  )
}
