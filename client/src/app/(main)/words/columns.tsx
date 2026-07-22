"use client"


import { Checkbox } from "@/components/ui/checkbox";
import { WordType } from "@/store/api/wordApi";
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export const getColumns = (
    selectedIds: Set<string>,
    onToggleCheck: (id: string) => void
): ColumnDef<WordType>[] => [
        {
            accessorKey: "word",
            header: () => <div className=" py-6 border-r uppercase font-bold text-center text-white z-10 bg-accent ">Word</div>,

            cell: ({ row }) => {
                const word = row.original.word;
                const pronunciation = row.original.pronunciation;
                return (
                    <div className="flex items-center gap-4 px-6 py-6  border-r z-20 bg-card">
                        <div
                            onClick={(e) => e.stopPropagation()} // ← chặn bubble lên TableRow
                        >
                            <Checkbox
                                className="border-accent"
                                checked={selectedIds.has(row.original.id)}
                                onCheckedChange={() => onToggleCheck(row.original.id)}
                            />
                        </div>
                        <div className="font-medium  flex flex-col   z-20">
                            <span className="font-bold">{word}</span>
                            <span className="text-sm text-muted-foreground italic">{pronunciation}</span>
                        </div>
                    </div>

                )
            }
        },
        {
            accessorKey: "partOfSpeech",
            header: () => <div className="px-6 py-6 border-r uppercase text-center text-white  bg-accent">POS</div>,
            cell: ({ row }) => {
                const partOfSpeech = row.original.partsofSpeech;
                return (
                    <div className="flex items-center gap-4 px-6 py-6  border-r  ">
                        <span className="px-2  py-1 bg-accent/10 text-xs rounded">{partOfSpeech || "N/A"}</span>
                    </div>

                )
            }
        },
        {
            accessorKey: "meaning",
            header: () => <div className="px-6 py-6 border-r uppercase text-center text-white bg-accent">Meaning</div>,
            cell: ({ row }) => {
                const meaning = row.original.meaning;
                return (
                    <p className="px-6 py-6 border-r  text-ellipsis whitespace-nowrap overflow-hidden max-w-55">{meaning}</p>
                )
            }
        },
        {
            accessorKey: "example",
            header: () => <div className="px-6 py-6  uppercase text-center text-white bg-accent">Example</div>,
            cell: ({ row }) => {
                const example = row.original.example;
                return (
                    <div className="px-6 py-6 border-r  ">{example[0]}</div>
                )
            }
        },
    ]


