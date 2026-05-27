"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"

import { useGetWordsQuery } from "@/store/api/wordApi"
import { Loader2 } from "lucide-react"


interface ListWordProps {
    categoryId: string
}

export function ListWord({ categoryId }: ListWordProps) {
    const { data: listWords, isLoading } = useGetWordsQuery({ page: 1, limit: 50, categoryId })

    const listWordsData = listWords?.data


    if (isLoading) return (
        <div className="flex justify-center py-8">
            <Loader2 className="animate-spin" />
        </div>
    )
    return (
        <div className="relative max-h-100 overflow-auto border rounded-md">
            {/* Chuyển sang border-separate và spacing-0 để sticky hoạt động chuẩn nhất */}
            <Table className="w-full border-separate border-spacing-0">
                <TableHeader className="relative z-20">
                    <TableRow>
                        {/* Ô giao điểm: Sticky cả Top và Left, Z-index cao nhất */}
                        <TableHead className="sticky top-0 left-0 z-30 bg-accent text-white border-b border-r text-center px-4 py-3">
                            Tên
                        </TableHead>

                        {/* Các ô Header khác: Chỉ Sticky Top */}
                        {/* <TableHead className="sticky top-0 z-20 bg-accent text-white border-b border-r text-center px-4 py-3">
                            Phát âm
                        </TableHead>
                        <TableHead className="sticky top-0 z-20 bg-accent text-white border-b border-r text-center px-4 py-3 min-w-[100px]">
                            Loại từ
                        </TableHead> */}
                        <TableHead className="sticky top-0 z-20 bg-accent text-white border-b border-r text-center px-4 py-3">
                            Nghĩa
                        </TableHead>
                        <TableHead className="sticky top-0 z-20 bg-accent text-white border-b text-center px-4 py-3">
                            Ví dụ
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {listWordsData?.length === 0 && (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">Không có dữ liệu</TableCell>
                        </TableRow>
                    </TableBody>
                )}

                <TableBody>
                    {listWordsData?.map((item) => (
                        <TableRow key={item.id} className="hover:bg-accent/10 hover:shadow-lg hover:z-10 cursor-pointer transition-all duration-300 font-semibold  group hover:-translate-y-0.5">
                            {/* Cột Tên: Sticky Left để khi cuộn ngang vẫn đứng im */}
                            <TableCell className="sticky left-0 group-hover:text-accent z-10 bg-background font-medium border-b border-r text-center">
                                {item.word}
                            </TableCell>

                            {/* <TableCell className="border-b border-r text-center italic text-muted-foreground">
                                {item.pronunciation}
                            </TableCell>

                            <TableCell className="border-b border-r text-center">
                                <span className="px-2 py-1   text-xs">
                                    {item.partOfSpeech}
                                </span>
                            </TableCell> */}

                            <TableCell className="border-b border-r max-w-50 truncate">
                                {item.meaning}
                            </TableCell>

                            <TableCell className="border-b italic text-muted">
                                {item.example}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}