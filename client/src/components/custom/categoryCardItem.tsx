"use client"

import { motion } from "motion/react"
import { Button } from "../ui/button"
import {
    CategoryType,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
} from "@/store/api/categoryApi"
import { DynamicIcon } from "lucide-react/dynamic"
import { EllipsisVertical, Pencil, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { toast } from "sonner"


import { ListWord } from "./listWord"
import { Progress } from "../ui/progress"

interface CategoryProps {
    item: CategoryType
}

const CategoryCardItem = ({ item }: CategoryProps) => {

    const [openMenu, setOpenMenu] = useState(false)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)


    const [openListWord, setOpenListWord] = useState(false)
    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)

    const ref = useRef<HTMLDivElement>(null)

    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()

    // click ngoài để đóng menu
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpenMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // ================= DELETE =================
    const handleDelete = () => {
        setOpenMenu(false)
        setOpenConfirmDelete(true)
    }

    const confirmDelete = async () => {
        try {
            await deleteCategory({ categoryId: item.id }).unwrap()
            toast.success("Xóa bộ từ thành công")
            setOpenConfirmDelete(false)
        } catch (err) {
            toast.error("Xóa thất bại")
            console.error(err)
        }
    }

    // ================= EDIT =================
    const handleEdit = () => {
        setOpenMenu(false)
        setName(item.name)
        setDescription(item.description)
        setOpenEdit(true)
    }

    const handleSubmitEdit = async () => {
        if (!name.trim()) {
            toast.error("Tên không được để trống")
            return
        }

        try {
            await updateCategory({
                categoryId: item.id,
                name,
                description,
            }).unwrap()

            toast.success("Cập nhật thành công")
            setOpenEdit(false)
        } catch (err) {
            toast.error("Cập nhật thất bại")
            console.error(err)
        }
    }


    return (
        <>
            <motion.div
                initial={{ y: 70, opacity: 0 }}
                transition={{ duration: 0.1 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="p-8 relative flex flex-col gap-3 rounded-2xl overflow-hidden bg-sidebar shadow-sm hover:-translate-y-2.5 hover:shadow-2xl transition-all duration-300"
            >
                <div className="flex items-center gap-4 mb-3">
                    <DynamicIcon
                        name={item.iconSlug as any}
                        size={36}
                        className="border border-border rounded-xl p-2"
                    />

                    <h4 className="font-serif text-2xl -tracking-wide">
                        {item.name}
                    </h4>

                    {/* MENU */}
                    <div ref={ref} className="ml-auto relative">
                        <EllipsisVertical
                            onClick={() => setOpenMenu(prev => !prev)}
                            className="rounded-full p-2 w-8 h-8 cursor-pointer hover:bg-border"
                        />

                        {openMenu && (
                            <div className="absolute right-4 min-w-30 top-8 p-2 rounded-md shadow-md flex flex-col gap-2 z-10 bg-card border border-border">
                                <div
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-border p-1 rounded"
                                >
                                    <Pencil className="w-4 h-4" />
                                    <span className="text-sm font-semibold">
                                        Sửa
                                    </span>
                                </div>

                                <div
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 cursor-pointer hover:bg-border p-1 rounded text-red-500"
                                >
                                    <Trash className="w-4 h-4" />
                                    <span className="text-sm font-semibold">
                                        Xóa
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-muted text-xs font-semibold italic min-h-18.75">
                    "{item.description}"
                </p>

                <span className="text-muted text-xs font-semibold italic">
                    {item.wordCount} từ
                </span>

                <Progress value={item.wordCount} className="h-2" />


                {/* ===== LIST WORD DIALOG ===== */}

                <Dialog open={openListWord} onOpenChange={setOpenListWord}>
                    <DialogTrigger
                        className="bg-accent rounded px-4 py-2 text-white text-sm font-semibold hover:bg-accent/80 cursor-pointer"
                    >
                        Xem danh sách từ
                    </DialogTrigger>

                    {/* Chỉ render khi open=true → chỉ đúng 1 categoryId được mount */}
                    {openListWord && (
                        <DialogContent className="md:min-w-6xl p-20">
                            <DialogHeader>
                                <DialogTitle>Danh sách từ vựng</DialogTitle>
                            </DialogHeader>
                            <ListWord categoryId={item.id} />
                        </DialogContent>
                    )}
                </Dialog>

            </motion.div>

            {/* ===== DELETE DIALOG ===== */}
            <AlertDialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Xóa "{item.name}"?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>
                            Hủy
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {isDeleting ? "Đang xóa..." : "Xóa"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* ===== EDIT DIALOG ===== */}
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa bộ từ</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4 py-2">
                        <Input
                            placeholder="Tên bộ từ"
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />

                        <Textarea
                            placeholder="Mô tả"
                            value={description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant="destructive"
                            onClick={() => setOpenEdit(false)}
                            disabled={isUpdating}
                            className="bg-muted text-white hover:bg-muted/80 cursor-pointer "
                        >
                            Hủy
                        </Button>

                        <Button
                            onClick={handleSubmitEdit}
                            disabled={isUpdating}
                            className="bg-accent text-white hover:opacity-80 cursor-pointer "
                        >
                            {isUpdating ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CategoryCardItem