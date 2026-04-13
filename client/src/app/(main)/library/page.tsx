'use client'
import { useGetWordsQuery } from '@/store/api/wordApi'
import { useAppSelector } from '@/store/hooks'

import { useMemo } from 'react'
import WordCardList from '@/components/custom/wordCardList'
import FilterCefrLevel from '@/components/custom/filterCefrLevel'

const LibraryPage = () => {
    const { data: words, isLoading } = useGetWordsQuery();

    const { activeFilter: activeFilterUI, currentPage: currentPageUI } = useAppSelector((state: any) => state.wordUI);
    const filteredWords = useMemo(() => {
        if (activeFilterUI === 'all') return words?.data;

        return words?.data?.filter((word) => word.cefrLevel === activeFilterUI);
    }, [words, activeFilterUI])

    console.log("words", words);

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                    <h1 className=' font-serif text-4xl md:text-5xl italic font-extralight mb-3 -space-x-0.5 tracking-tighter'>Thư viện của bạn</h1>
                    <p className='text-muted text-sm md:text-base font-lora font-semibold'>Quản lý và tổ chức kho tàng tri thức cá nhân.</p>
                </div>

                <FilterCefrLevel activeFilterUI={activeFilterUI} />
            </div>
            <WordCardList isLoading={isLoading} filteredWords={filteredWords || []} />
        </div>
    )
}
export default LibraryPage