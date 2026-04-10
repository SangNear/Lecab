import { BookOpen, CircleCheck, Plus, Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const EmptyReview = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full gap-4 overflow-hidden'>
            <div className='p-14 rounded-[4.5rem] bg-card border border-accent-soft shadow-lg shadow-accent/10 mb-10 '>
                <CircleCheck className='text-accent w-[110px] h-[110px]' />
            </div>

            <div className='py-1 flex items-center gap-2 px-4 rounded-lg bg-accent-soft border border-border '>
                <Zap className='w-4 h-4 text-accent' />
                <p className='text-sm font-semibold tracking-wider leading-none text-accent uppercase'>Mục tiêu hôm nay đã xong</p>
            </div>

            <div className='flex flex-col items-center justify-center text-center'>
                <h2 className='text-xl md:text-6xl font-serif font-bold italic  '>Thành công! <br />
                    <span className='text-accent  '>Bạn đã hoàn thành ôn tập hôm nay</span>
                </h2>
                <p className='text-muted text-xl max-w-md text-center mt-3 md:mx-8'>Hệ thống không tìm thấy từ vựng nào cần ôn tập thêm. Hãy nghỉ ngơi để não bộ củng cố kiến thức nhé.</p>
            </div>

            <div className='mt-16 flex flex-col md:flex-row items-center justify-center gap-4'>

                <Link href="/add-a-word" className='group p-8 rounded-lg border border-border hover:border-accent/40 flex flex-col gap-2 hover:translate-y-[-10px] duration-500 cursor-pointer bg-card'>
                    <div className='p-4 mb-6  rounded-lg w-fit group-hover:bg-accent duration-500 bg-accent-soft'>
                        <Plus className='w-6 h-6 text-accent group-hover:text-primary-foreground duration-500' />
                    </div>
                    <span className='text-lg font-semibold uppercase text-foreground'>Thêm từ mới</span>
                    <span className='text-muted text-sm'>Tiếp tục hành trình bằng cách thêm các từ vựng mới vào thư viện.</span>
                </Link>
                <div className='relative group p-8 rounded-lg border border-border flex flex-col gap-2 bg-foreground cursor-not-allowed text-background'>
                    <div className='hidden bg-transparent p-4 absolute group-hover:top-0 transition-all duration-500 bottom-0 left-0 right-0 group-hover:flex items-center justify-center border border-background/20'>
                        <span className='text-xs text-accent font-semibold p-4 border border-accent/60 rounded-lg tracking-widest uppercase'>Coming soon</span>
                    </div>
                    <div className='p-4 mb-6 bg-background/10 w-fit rounded-lg '>
                        <BookOpen className='w-6 h-6 text-accent' />
                    </div>
                    <span className='text-lg font-semibold '>AI story generator</span>
                    <span className='text-sm text-background/75 font-semibold'>Tạo câu chuyện ngắn từ những từ bạn vừa thuộc để ghi nhớ sâu hơn. <span className='text-accent'>(Đang phát triển)</span> </span>
                </div>
            </div>


        </div>
    )
}

export default EmptyReview
