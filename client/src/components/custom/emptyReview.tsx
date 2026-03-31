import { BookOpen, CircleCheck, Plus, Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EmptyReview = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full gap-4 overflow-hidden'>
            <div className='p-14 rounded-[4.5rem] bg-white border   border-orange-50/50  shadow-orange-500/10 shadow-xl mb-10 '>
                <CircleCheck className='text-orange-500 w-[110px] h-[110px]' />
            </div>

            <div className='py-1 flex items-center gap-2 px-4 rounded-lg bg-orange-50 border-orange-100/50 border '>
                <Zap className='w-4 h-4 text-orange-500' />
                <p className='text-sm font-semibold tracking-wider leading-none text-orange-500 uppercase'>Mục tiêu hôm nay đã xong</p>
            </div>

            <div className='flex flex-col items-center ju                                                                                                                                                                                                                                           stify-center text-center'>
                <h2 className='text-xl md:text-6xl font-serif font-bold italic  '>Thành công! <br />
                    <span className='text-orange-500  '>Bạn đã hoàn thành ôn tập hôm nay</span>
                </h2>
                <p className='text-muted text-xl max-w-md text-center mt-3 md:mx-8'>Hệ thống không tìm thấy từ vựng nào cần ôn tập thêm. Hãy nghỉ ngơi để não bộ củng cố kiến thức nhé.</p>
            </div>

            <div className='mt-16 flex flex-col md:flex-row items-center justify-center gap-4'>

                <Link href="/add-a-word" className='group p-8 rounded-lg border border-gray-200  hover:border-orange-200/50 flex flex-col gap-2 hover:translate-y-[-10px] duration-500 cursor-pointer'>
                    <div className='p-4 mb-6  rounded-lg w-fit group-hover:bg-orange-500 duration-500 bg-orange-50'>
                        <Plus className='w-6 h-6 text-orange-500 group-hover:text-white duration-500' />
                    </div>
                    <span className='text-lg font-semibold uppercase'>Thêm từ mới</span>
                    <span className='text-muted text-sm'>Tiếp tục hành trình bằng cách thêm các từ vựng mới vào thư viện.</span>
                </Link>
                <div className=' relative group p-8 rounded-lg border hover:bg-foreground border-gray-200  flex flex-col gap-2 bg-[#292929] cursor-not-allowed '>
                    <div className='hidden bg-transparent p-4 absolute group-hover:top-0 transition-all duration-500 bottom-0 left-0 right-0 group-hover:flex items-center justify-center border border-orange-500/50'>
                        <span className='text-xs text-orange-500 font-semibold p-4 border border-orange-500/50 rounded-lg tracking-widest uppercase'>Coming soon</span>
                    </div>
                    <div className='p-4 mb-6 bg-white/10 w-fit rounded-lg '>
                        <BookOpen className='w-6 h-6 text-orange-500' />
                    </div>
                    <span className='text-lg font-semibold text-white'>AI story generator</span>
                    <span className='text-sm text-[#6b7280] font-semibold'>Tạo câu chuyện ngắn từ những từ bạn vừa thuộc để ghi nhớ sâu hơn. <span className='text-orange-500'>(Đang phát triển)</span> </span>
                </div>
            </div>


        </div>
    )
}

export default EmptyReview