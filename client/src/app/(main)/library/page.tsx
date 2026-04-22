'use client'
import { useGetWordsQuery } from '@/store/api/wordApi'
import { useAppSelector } from '@/store/hooks'

import { useEffect, useRef, useState } from 'react'
import WordCardList from '@/components/custom/wordCardList'
import FilterCefrLevel from '@/components/custom/filterCefrLevel'
import PaginationCustom from '@/components/custom/paginationCustom'
import { setSearchStore } from '@/store/slices/wordSlices'
import { useAppDispatch } from '@/store/hooks'

const LibraryPage = () => {

    const dispatch = useAppDispatch();

    const { activeFilter: activeFilterUI, currentPage: currentPageUI, searchStore } = useAppSelector((state: any) => state.wordUI);
    const [searchInput, setSearchInput] = useState('');
    const { data: words, isLoading } = useGetWordsQuery({ page: currentPageUI, limit: 12, cefrLevel: activeFilterUI, search: searchStore });

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const handleSearch = (value: string) => {
        console.log("value", value);
        setSearchInput(value);
        console.log("timerRef", timerRef);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            dispatch(setSearchStore(value));
        }, 500);
    }
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);


    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                    <h1 className=' font-serif text-4xl md:text-5xl italic font-extralight mb-3 -space-x-0.5 tracking-tighter'>Thư viện của bạn</h1>
                    <p className='text-muted text-sm md:text-base font-lora font-semibold'>Quản lý và tổ chức kho tàng tri thức cá nhân.</p>
                </div>

                <div className='flex flex-col gap-2 '>
                    <FilterCefrLevel activeFilterUI={activeFilterUI} />
                    <input
                        type="text"
                        value={searchInput}
                        placeholder='Tìm từ'
                        className='w-full max-w-md rounded-xl border border-border px-4 py-2 focus:outline-none'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
                    />
                </div>


            </div>
            <WordCardList isLoading={isLoading} filteredWords={words?.data || []} />

            <PaginationCustom
                totalPages={words?.pagination?.totalPages || 0}
                currentPage={currentPageUI || 1}
                totalItems={words?.pagination?.totalItems || 0}
                search={searchInput ?? ''}
            />

        </div>
    )
}
export default LibraryPage