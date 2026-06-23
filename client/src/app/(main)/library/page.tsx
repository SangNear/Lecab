'use client'

import { useGetAllCategoriesQuery } from '@/store/api/categoryApi'
import CategoryCardList from '@/components/custom/categoryCardList'

const LibraryPage = () => {
    const { data: categories, isLoading: isLoadingCategories } = useGetAllCategoriesQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                    <h1 className=' font-serif text-4xl md:text-5xl italic font-extralight mb-3 -space-x-0.5 tracking-tighter'>Thư viện bộ từ </h1>
                    <p className='text-muted text-sm md:text-base font-lora font-semibold'>Quản lý và tổ chức kho tàng tri thức cá nhân.</p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
                    <div className='bg-sidebar  border border-orange-900/10 p-4 rounded-2xl '>
                        <p className='text-xs text-foreground uppercase font-bold tracking-wider mb-1'>Tổng bộ từ</p>
                        <p className='text-2xl font-bold text-accent'>{categories?.length}</p>
                    </div>
                    <div className='bg-sidebar  border border-orange-900/10 p-4 rounded-2xl'>
                        <p className='text-xs text-foreground uppercase font-bold tracking-wider mb-1'>Đã thuộc</p>
                        <p className='text-2xl font-bold text-green-500'>954</p>
                    </div>
                    <div className='bg-sidebar  border border-orange-900/10 p-4 rounded-2xl'>
                        <p className='text-xs text-foreground uppercase font-bold tracking-wider mb-1'>Cần ôn tập</p>
                        <p className='text-2xl font-bold text-red-500'>12</p>
                    </div>
                    <div className='bg-sidebar  border border-orange-900/10 p-4 rounded-2xl'>
                        <p className='text-xs text-foreground uppercase font-bold tracking-wider mb-1'>Tổng số từ</p>
                        <p className='text-2xl font-bold text-muted'>1223</p>
                    </div>

                </div>
            </div>
            <CategoryCardList isLoading={isLoadingCategories} filteredCategories={categories || []} />
        </div>
    )
}
export default LibraryPage