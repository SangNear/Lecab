import { Zap } from 'lucide-react'


const DashboardPage = () => {
    return (
        <div className='w-full flex flex-col'>
            <h1 className='font-lora text-4xl md:text-5xl italic font-semibold mb-3 -space-x-0.5 tracking-tighter '>Mục tiêu hôm nay: <br /> <span className='text-accent font-bold '>Hoàn thành 15 từ mới</span></h1>
            <p className='text-muted text-sm md:text-base font-semibold'>Bạn đang đứng thứ <span className='text-accent font-bold '>10</span> trong bảng xếp hạng tuần này.</p>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                <div className='bg-card p-8 rounded-[2.5rem] border border-border shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all'>
                    <Zap className='w-12 h-12 text-amber-500  rounded-2xl p-2' />
                    <div className='flex flex-col gap-2'>
                        <p className='text-[10px] font-black uppercase text-subtle tracking-widest mb-1'>Chuỗi ngày học</p>
                        <p className='text-3xl font-serif font-bold italic tracking-tight leading-none mb-1 text-foreground'>10 ngày</p>
                        <p className='text-[11px] text-subtle font-medium truncate'>Kỷ lục cá nhân</p>
                    </div>
                </div>
                <div className='bg-card p-8 rounded-[2.5rem] border border-border shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all'>
                    <Zap className='w-8 h-8 text-amber-500' />
                    <div className='flex flex-col gap-2'>
                        <p className='text-[10px] font-black uppercase text-subtle tracking-widest mb-1'>Chuỗi ngày học</p>
                        <p className='text-3xl font-serif font-bold italic tracking-tight leading-none mb-1 text-foreground'>10 ngày</p>
                        <p className='text-[11px] text-subtle font-medium truncate'>Kỷ lục cá nhân</p>
                    </div>
                </div>
                <div className='bg-card p-8 rounded-[2.5rem] border border-border shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all'>
                    <Zap className='w-8 h-8 text-amber-500' />
                    <div className='flex flex-col gap-2'>
                        <p className='text-[10px] font-black uppercase text-subtle tracking-widest mb-1'>Chuỗi ngày học</p>
                        <p className='text-3xl font-serif font-bold italic tracking-tight leading-none mb-1 text-foreground'>10 ngày</p>
                        <p className='text-[11px] text-subtle font-medium truncate'>Kỷ lục cá nhân</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
