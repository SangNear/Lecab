"use client"
import ButtonCustom from '@/components/custom/buttonCustom'
import { Progress } from '@/components/ui/progress'
import { Check, CornerDownLeft } from 'lucide-react'
import { useState } from 'react'


const ReviewPage = () => {
    const [isRevealed, setIsRevealed] = useState(false)

    const handleRevealed = () => {
        setIsRevealed(true)
    }
    return (
        <div className='flex flex-col'>
            <p className='text-muted text-xs tracking-[0.816px] font-sans font-weight-[300] mb-8 text-center'>1 of 2</p>
            <Progress value={30} className="w-full mb-8" />
            <div
                onClick={handleRevealed}
                className={`py-10 px-8  flex flex-col items-center justify-center border 
                border-border rounded-lg bg-card relative min-h-[280px] 
                ${isRevealed ? "" : "hover:translate-y-[-5px] duration-150 hover:shadow-lg cursor-pointer"} `}
            >
                <p className='tracking-wider text-[#C8C5C0] text-sm uppercase mb-4'>
                    {isRevealed ? 'meaning' : 'tap to reveal'}
                </p>
                <p className='text-foreground text-[38px] font-lora'>apple</p>
                {isRevealed && <p className='text-[#4a4845] text-[16px] mt-4'>a hard round fruit that has red, light green, or yellow skin and is white inside</p>}
                {isRevealed && <p className='text-[#B0ACA8] text-[14px] italic mt-3'>"The apple doesn’t fall far from the tree"</p>}
                <div className='absolute bottom-4 flex gap-1'>
                    <span className='w-1.5 h-1.5 rounded-full bg-[#e0ddd8]'></span>
                    <span className='w-1.5 h-1.5 rounded-full bg-[#e0ddd8]'></span>
                    <span className='w-1.5 h-1.5 rounded-full bg-[#e0ddd8]'></span>
                </div>
            </div>
            {/* <p className='text-center text-gray-300 text-[16px] mt-5 tracking-wider  whitespace-nowrap'>Think about the meaning, then tap the card</p> */}
            <div className='grid grid-cols-2 gap-4 mt-5'>
                <ButtonCustom
                    description='review tomorrow'
                    className='bg-[#Fdf3ec] rounded-[14px] border-[0.5px] border-[#edd8c0] text-danger transition-transform hover:bg-[#f8e9d8] hover:-translate-y-0.25 duration-150'
                    title='Again'
                    icon={<CornerDownLeft />}
                />

                <ButtonCustom
                    description='review in 3 days'
                    className='bg-[#EEF5F0] rounded-[14px] border-[0.5px] border-[#B2CDB9] text-[#3E7256] transition-transform hover:bg-[#DFF0E5] hover:-translate-y-0.25 duration-150'
                    title='Easy'
                    icon={<Check />}
                />
            </div>
        </div>
    )
}

export default ReviewPage