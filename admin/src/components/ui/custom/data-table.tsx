import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// INTERFACE FOR CLEANER CODE
interface DataTableProps<TData, TValue> {
  pageSize: number
  showFilter: boolean
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
}

export function DataTable<TData, TValue>({ pageSize, showFilter, data, columns }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const router = useRouter()
  const pathname = usePathname()

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize
      }
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })

  const handleCellClick = (cell: any) => {
    const agencyId = cell.row.original.id // Assuming row.original contains the data for the row
    console.log("pathName: ", pathname.toString())
    if (pathname.toString().includes("travel-agencies")) {
      router.push(`/travel-agencies/${agencyId}`)
    } else if (pathname.toString().includes("hiking-agencies")) {
      router.push(`/hiking-agencies/${agencyId}`)
    }
  }

  return (
    <div className="mt-5 w-full">
      {/* FILTER FUNCTION.... */}
      {showFilter && (
        <div className="ml-2 flex items-center py-4">
          <Input
            placeholder="Filter agencies by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      {/* LIST... */}
      <div className="mx-2 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="cursor-pointer">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} onClick={() => handleCellClick(cell)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* PREVIOUS AND NEXT PAGE... */}
      <div className="flex items-center justify-end space-x-2 px-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
