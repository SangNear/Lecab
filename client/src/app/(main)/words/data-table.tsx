"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import { WordType } from "@/store/api/wordApi"
import { cn } from "@/lib/utils"

interface DataTableProps<TValue> {
    columns: ColumnDef<WordType, TValue>[]
    data: WordType[]
    onRowClick?: (row: WordType) => void
}
function getStickyClass(columnId: string) {
    if (columnId === "select") return "sticky -left-1  z-20   w-10"
    if (columnId === "word") return "sticky -left-1  z-20  "
    return ""
}
export function DataTable<TValue>({
    columns,
    data,
    onRowClick,
}: DataTableProps<TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-x-auto rounded-md border">
            <Table className="min-w-full p-4">
                <TableHeader className=" border-b ">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="cursor-default" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className={` ${getStickyClass(header.column.id)} p-0 `}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="cursor-pointer "
                                onClick={() => {
                                    console.log("row id:", row.original.word)
                                    onRowClick?.(row.original)
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className={` ${getStickyClass(cell.column.id)} p-0 `}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="h-24 text-center">
                                Chưa có dữ liệu
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}