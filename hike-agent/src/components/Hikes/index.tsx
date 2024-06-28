"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/custom/data-table"
import { Hike } from "@/api/hike/types"
import { DateTime } from "luxon"

export const columns: ColumnDef<Hike>[] = [
  {
    accessorKey: "destination",
    header: "Destination"
  },
  {
    accessorKey: "departure_place",
    header: "Departure Place"
  },
  {
    accessorKey: "departure_date",
    header: "Departure Date"
  },
  {
    accessorKey: "return_date",
    header: "Return Date"
  },
  {
    accessorKey: "total_limit",
    header: "Total Limit"
  },
  {
    accessorKey: "places_left",
    header: "Places Left"
  }
]

export default function Hikes({ pageSize, data }: { pageSize: number; data: Hike[] }) {
  return (
    <div className="w-full">
      <DataTable
        placeholder="Filter by destination"
        searchKey="destination"
        pageSize={pageSize}
        data={data.map((d) => ({
          ...d,
          departure_date: DateTime.fromISO(d.departure_date).toFormat("LLL dd yyyy"),
          return_date: DateTime.fromISO(d.return_date).toFormat("LLL dd yyyy")
        }))}
        columns={columns}
        showFilter={true}
      />
    </div>
  )
}
