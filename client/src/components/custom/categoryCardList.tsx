"use client"
import { CategoryType } from '@/store/api/categoryApi';
import { Loader2, Plus, X } from 'lucide-react';
import CategoryCardItem from './categoryCardItem';
import React, { useState } from 'react';
import DialogCreateCategory from './dialogCreateCategory';



interface CategoryListProps {
    isLoading: boolean;
    filteredCategories: CategoryType[];
}
const CategoryCardList = ({ isLoading, filteredCategories }: CategoryListProps) => {
    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-10 gap-6'>
            {isLoading ? (
                <div className='flex items-center justify-center'>
                    <Loader2 className='w-10 h-10 animate-spin' />
                </div>
            )
                :
                filteredCategories && filteredCategories?.length > 0 ? filteredCategories?.map((item) => (

                    <CategoryCardItem key={item.id} item={item} />
                )) : filteredCategories && filteredCategories?.length === 0 ? (
                    <div className='flex items-center justify-center'>
                        <p className='text-muted text-sm font-semibold'>Chưa có bộ từ nào</p>
                    </div>
                ) : null}
            <button
                onClick={() => setOpenCreateCategoryDialog(true)}
                className="group cursor-pointer relative flex flex-col items-center justify-center p-6  border-2 border-dashed border-gray-200 rounded-2xl hover:border-orange-400 hover:bg-orange-50/30 transition-all duration-300 min-h-[320px]"
            >
                <div className="p-4 bg-orange-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Plus size={32} className="text-orange-600" />
                </div>
                <span className="mt-4 font-bold text-gray-600 group-hover:text-orange-600">Tạo bộ từ mới</span>
                <p className="mt-1 text-xs text-gray-400 px-4 text-center">Xây dựng kho tàng kiến thức cá nhân của bạn</p>
            </button>
            {openCreateCategoryDialog && (
                <DialogCreateCategory setOpenCreateCategoryDialog={setOpenCreateCategoryDialog} />
            )}
        </div>
    )

}

export default React.memo(CategoryCardList)