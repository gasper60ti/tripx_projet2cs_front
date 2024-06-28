"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/custom/data-table"

export type Agency = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  status: string
}

export const columns: ColumnDef<Agency>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "phone",
    header: "Phone"
  },
  {
    accessorKey: "status",
    header: "Status"
  }
]

export function HikeAgencies({ pageSize, data }: { pageSize: number; data: Agency[] }) {
  return (
    <div className="w-full">
      <DataTable pageSize={pageSize} data={data} columns={columns} showFilter={false} />
    </div>
  )
}
