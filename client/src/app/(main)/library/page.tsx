'use client'
import { Progress, ProgressTrack } from '@/components/ui/progress'
import { useGetWordsQuery } from '@/store/api/wordApi'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setActiveFilter } from '@/store/slices/wordSlices'
import { RootState } from '@reduxjs/toolkit/query'

import React, { useEffect, useMemo, useState } from 'react'

const LibraryPage = () => {

    const filters = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']
    const colorLevel = {
        'A1': 'from-green-400 to-green-600',
        'A2': 'from-yellow-400 to-yellow-600',
        'B1': 'from-orange-400 to-orange-600',
        'B2': 'from-blue-400 to-blue-600',
        'C1': 'from-purple-400 to-purple-600',
        'C2': 'from-rose-400 to-rose-600',
    }
    const dispatch = useAppDispatch();
    const { data: words = []  } = useGetWordsQuery();
    const { activeFilter: activeFilterUI, currentPage: currentPageUI } = useAppSelector((state: any) => state.wordUI);
    const filteredWords = useMemo(() => {
        if (activeFilterUI === 'all') return words;

        return words.filter((word) => word.cefrLevel === activeFilterUI);
    }, [words, activeFilterUI])

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                    <h1 className=' font-serif text-4xl md:text-5xl italic font-extralight mb-3 -space-x-0.5 tracking-tighter'>Thư viện của bạn</h1>
                    <p className='text-muted text-sm md:text-base font-lora font-semibold'>Quản lý và tổ chức kho tàng tri thức cá nhân.</p>
                </div>

                <div className='p-2 flex items-center justify-around rounded-2xl border max-w-fit gap-2 transition-all duration-100 overflow-x-auto1'>
                    {filters.map((filter) => (
                        <div key={filter} className={`cursor-pointer  rounded-xl py-2 px-6 uppercase ${activeFilterUI === filter ? 'bg-orange-400 text-white' : 'hover:bg-gray-200'}`} onClick={() => dispatch(setActiveFilter(filter))}>
                            {filter}
                        </div>
                    ))}
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-6'>
                {filteredWords.map((item) => (
                    <div key={item.id} className='p-8 relative group flex flex-col gap-4 rounded-2xl border border-gray-200 shadow-sm  hover:border-orange-100 hover:shadow-2xl transition-all duration-300'>
                        <div className=''>
                            <div className={`py-1 px-3 group-hover:bg-orange-400 bg-muted rounded-xl mb-6 text-white w-fit text-sm font-semibold uppercase  bg-linear-to-r 
                                ${item.cefrLevel in colorLevel ? colorLevel[item.cefrLevel as keyof typeof colorLevel] : ''}`}>
                                {item.cefrLevel}
                            </div>
                            <h4 className='font-serif mb-3 text-3xl -tracking-wide group-hover:text-orange-400'>{item.word}</h4>
                            <p className='text-muted text-sm font-semibold italic min-h-[100px]'>"{item.meaning}"</p>
                        </div>
                        <div className='pt-4'>
                            <div className='flex items-center justify-between'>
                                <span className='text-muted text-sm font-semibold'>
                                    Độ thuộc: {
                                        (item.correctCount + item.wrongCount) > 0
                                            ? Math.round((item.correctCount / (item.correctCount + item.wrongCount)) * 100)
                                            : 0
                                    }%
                                </span>
                                <span className='text-muted text-sm font-semibold'>Learning</span>
                            </div>
                            <div className='mt-2'>
                                <Progress value={item.correctCount / (item.correctCount + item.wrongCount) * 100} className="w-full mb-8" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default LibraryPage