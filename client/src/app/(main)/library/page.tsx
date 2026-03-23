'use client'
import { Progress, ProgressTrack } from '@/components/ui/progress'
import React, { useState } from 'react'

const LibraryPage = () => {
    const [activeFilter, setActiveFilter] = useState('all')
    const filters = ['all', 'B1', 'B2', 'C1']
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col'>
                    <h1 className=' font-serif text-4xl md:text-5xl italic font-extralight mb-3 -space-x-0.5 tracking-tighter'>Thư viện của bạn</h1>
                    <p className='text-muted text-sm md:text-base font-lora font-semibold'>Quản lý và tổ chức kho tàng tri thức cá nhân.</p>
                </div>

                <div className='p-2 flex items-center justify-around rounded-2xl border max-w-fit gap-2 transition-all duration-100'>
                    {filters.map((filter) => (
                        <div key={filter} className={`cursor-pointer  rounded-xl py-2 px-6 uppercase ${activeFilter === filter ? 'bg-primary text-white' : 'hover:bg-gray-200'}`} onClick={() => setActiveFilter(filter)}>
                            {filter}
                        </div>
                    ))}
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-6'>
                <div className='p-8 group flex flex-col gap-4 rounded-2xl border border-gray-200 shadow-sm  hover:border-orange-100 hover:shadow-2xl transition-all duration-300'>
                    <div>
                        <div className='py-1 px-3 group-hover:bg-orange-400 bg-muted rounded-xl mb-6 text-white w-fit text-sm font-semibold uppercase'>B1</div>
                        <h4 className='font-sans mb-3 text-3xl -tracking-wide group-hover:text-orange-400'>abandon</h4>
                        <p className='text-muted text-sm font-semibold italic'>"to l eave something behind eave something bnd"</p>
                    </div>
                    <div className='pt-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-muted text-sm font-semibold'>Độ thuộc: 80%</span>
                            <span className='text-muted text-sm font-semibold'>Learning</span>
                        </div>
                        <div className='mt-2'>
                            <Progress value={80} className="w-full mb-8" />
                        </div>
                    </div>

                </div>
                <div className='p-8 group flex flex-col gap-4 rounded-2xl border border-gray-200 shadow-sm  hover:border-orange-100 hover:shadow-2xl transition-all duration-300'>
                    <div>
                        <div className='py-1 px-3 group-hover:bg-orange-400 bg-muted rounded-xl mb-6 text-white w-fit text-sm font-semibold uppercase'>B1</div>
                        <h4 className='font-sans mb-3 text-3xl -tracking-wide group-hover:text-orange-400'>abandon</h4>
                        <p className='text-muted text-sm font-semibold italic'>"to l eave something behind eave something behind eave something behind eave something behind"</p>
                    </div>
                    <div className='pt-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-muted text-sm font-semibold'>Độ thuộc: 80%</span>
                            <span className='text-muted text-sm font-semibold'>Learning</span>
                        </div>
                        <div className='mt-2'>
                            <Progress value={80} className="w-full mb-8" />
                        </div>
                    </div>

                </div>
                <div className='p-8 group flex flex-col gap-4 rounded-2xl border border-gray-200 shadow-sm  hover:border-orange-100 hover:shadow-2xl transition-all duration-300'>
                    <div>
                        <div className='py-1 px-3 group-hover:bg-orange-400 bg-muted rounded-xl mb-6 text-white w-fit text-sm font-semibold uppercase'>B1</div>
                        <h4 className='font-sans mb-3 text-3xl -tracking-wide group-hover:text-orange-400'>abandon</h4>
                        <p className='text-muted text-sm font-semibold italic'>"to l eave something behind eave something behind eave something behind eave something behind"</p>
                    </div>
                    <div className='pt-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-muted text-sm font-semibold'>Độ thuộc: 80%</span>
                            <span className='text-muted text-sm font-semibold'>Learning</span>
                        </div>
                        <div className='mt-2'>
                            <Progress value={80} className="w-full mb-8" />
                        </div>
                    </div>

                </div>
                <div className='p-8 group flex flex-col gap-4 rounded-2xl border border-gray-200 shadow-sm  hover:border-orange-100 hover:shadow-2xl transition-all duration-300'>
                    <div>
                        <div className='py-1 px-3 group-hover:bg-orange-400 bg-muted rounded-xl mb-6 text-white w-fit text-sm font-semibold uppercase'>B1</div>
                        <h4 className='font-sans mb-3 text-3xl -tracking-wide group-hover:text-orange-400'>abandon</h4>
                        <p className='text-muted text-sm font-semibold italic'>"to l eave something behind eave something behind eave something behind eave something behind"</p>
                    </div>
                    <div className='pt-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-muted text-sm font-semibold'>Độ thuộc: 80%</span>
                            <span className='text-muted text-sm font-semibold'>Learning</span>
                        </div>
                        <div className='mt-2'>
                            <Progress value={80} className="w-full mb-8" />
                        </div>
                    </div>

                </div>
                <div className='p-8 group flex flex-col gap-4 rounded-2xl border border-gray-200 shadow-sm  hover:border-orange-100 hover:shadow-2xl transition-all duration-300'>
                    <div>
                        <div className='py-1 px-3 group-hover:bg-orange-400 bg-muted rounded-xl mb-6 text-white w-fit text-sm font-semibold uppercase'>B1</div>
                        <h4 className='font-sans mb-3 text-3xl -tracking-wide group-hover:text-orange-400'>abandon</h4>
                        <p className='text-muted text-sm font-semibold italic'>"to l eave something behind eave something behind eave something behind eave something behind"</p>
                    </div>
                    <div className='pt-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-muted text-sm font-semibold'>Độ thuộc: 80%</span>
                            <span className='text-muted text-sm font-semibold'>Learning</span>
                        </div>
                        <div className='mt-2'>
                            <Progress value={80} className="w-full mb-8" />
                        </div>
                    </div>

                </div>
                <div className='p-8 group flex flex-col gap-4 rounded-2xl border border-gray-200 shadow-sm  hover:border-orange-100 hover:shadow-2xl transition-all duration-300'>
                    <div>
                        <div className='py-1 px-3 group-hover:bg-orange-400 bg-muted rounded-xl mb-6 text-white w-fit text-sm font-semibold uppercase'>B1</div>
                        <h4 className='font-sans mb-3 text-3xl -tracking-wide group-hover:text-orange-400'>abandon</h4>
                        <p className='text-muted text-sm font-semibold italic'>"to l eave something behind eave something behind eave something behind eave something behind"</p>
                    </div>
                    <div className='pt-4'>
                        <div className='flex items-center justify-between'>
                            <span className='text-muted text-sm font-semibold'>Độ thuộc: 80%</span>
                            <span className='text-muted text-sm font-semibold'>Learning</span>
                        </div>
                        <div className='mt-2'>
                            <Progress value={80} className="w-full mb-8" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LibraryPage