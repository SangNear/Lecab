import { useAddCategoryMutation } from '@/store/api/categoryApi'
import { BookOpen, Briefcase, HeartPulse, Utensils, Film, Laptop, Code, Loader2, X, Plane, Music, Gamepad2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface DialogCreateCategoryProps {

    setOpenCreateCategoryDialog: (open: boolean) => void
}
const DialogCreateCategory = ({ setOpenCreateCategoryDialog }: DialogCreateCategoryProps) => {
    const iconMap: Record<string, React.ComponentType> = {
        "book-open": BookOpen,
        "briefcase": Briefcase,
        "plane": Plane,
        "utensils": Utensils,
        "heart-pulse": HeartPulse,
        "music": Music,
        "film": Film,
        "gamepad-2": Gamepad2,
        "laptop": Laptop,
        "code": Code,
    };
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        iconSlug: "",
    })
    const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await addCategory(formData)
            .unwrap()
            .then((res) => {
                toast.success('Bộ từ đã được tạo thành công')
                setOpenCreateCategoryDialog(false)
                setFormData({
                    name: '',
                    description: '',
                    iconSlug: '',
                })
            })
            .catch((err) => {
                toast.error('Lỗi khi tạo bộ từ')
                console.error(err)
            })
    }
    return (
        <form className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg backdrop-blur-sm" onSubmit={handleSubmit}>
            <div className="bg-background w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="px-6 py-4 flex justify-between items-center border-b border-gray-50">
                    <h2 className="text-xl font-bold text-accent">Tạo bộ từ mới</h2>
                    <button
                        onClick={() => setOpenCreateCategoryDialog(false)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    
                    <div className='space-y-4'>


                        {/* Name input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Tên bộ từ</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Ví dụ: IELTS Vocabulary, Tiếng Nhật cơ bản..."
                                className="w-full px-4 text- py-3  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-500 transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        {/* Description input */}
                        <div>
                            <label htmlFor="desc" className="block text-sm font-semibold text-gray-700 mb-1">Mô tả (không bắt buộc)</label>
                            <textarea
                                id="desc"
                                rows={3}
                                placeholder="Mô tả mục tiêu của bộ từ này..."
                                className="w-full px-4 py-3  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-500 transition-all resize-none"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        {/* Icon Selector */}
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Chọn biểu tượng</label>
                        <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto p-1">
                            {Object.keys(iconMap).map((iconKey) => {
                                const IconComp = iconMap[iconKey]

                                return (
                                    <div
                                        key={iconKey}
                                        onClick={() => setFormData({ ...formData, iconSlug: iconKey })}
                                        className={`p-2 flex items-center justify-center rounded-xl transition-all ${formData.iconSlug === iconKey
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 scale-110'
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                            }`}
                                    >
                                        {IconComp && <IconComp />}
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4  flex gap-3">
                        <button
                            onClick={() => setOpenCreateCategoryDialog(false)}
                            className="flex-1 py-3 px-4  border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={isAdding}
                            type="submit"
                            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-accent transition-all shadow-lg ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Tạo ngay'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default DialogCreateCategory