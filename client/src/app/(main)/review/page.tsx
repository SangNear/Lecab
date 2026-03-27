"use client"
import ButtonCustom from '@/components/custom/buttonCustom'
import { Progress } from '@/components/ui/progress'
import { Check, CornerDownLeft, Layers, Volume2 } from 'lucide-react'
import { useState } from 'react'


const ReviewPage = () => {
    const [isRevealed, setIsRevealed] = useState(false)

    const handleRevealed = () => {
        setIsRevealed(true)
    }
    const voice = new SpeechSynthesisUtterance('overwhelming')
    
    const handleVoice = () => {
        speechSynthesis.speak(voice)
    }
    return (
        <div className='flex     justify-evenly gap-20'>
            <div className=' flex-2 flex flex-col max-w-3xl'>
                <div className='flex items-center justify-center gap-2 border border-gray-200 rounded-full py-4 px-6 '>
                    <p className='text-gray-500 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap leading-none'>Tiến trình ôn tập</p>

                    <Progress value={50} className=" flex-1 w-full max-w-3xl leading-none transition-all duration-300" />


                    <p className='text-muted text-xs leading-none tracking-[0.816px] font-sans font-weight-[300] text-center'>1 of 2</p>
                </div>

                <div
                    onClick={handleRevealed}
                    className={`py-10 px-8 mt-12  flex flex-col items-center justify-center border 
                                border-border rounded-lg bg-card relative min-h-[280px] 
                                ${isRevealed ? "" : "hover:translate-y-[-5px] duration-150 hover:shadow-lg cursor-pointer"} `}
                >
                    <p className='tracking-wider text-[#C8C5C0] text-sm uppercase mb-4'>
                        {isRevealed ? 'meaning' : 'tap to reveal'}
                    </p>
                    <div onClick={handleVoice} className='absolute top-4 right-4 p-2 rounded-sm bg-gray-100 text-muted cursor-pointer hover:translate-y-[-5px] duration-150 hover:shadow-lg hover:bg-orange-300 hover:text-white'>
                        <Volume2 />
                    </div>
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

            <div className='hidden flex-1 md:flex flex-col items-center   w-80  max-w-80'>
                <div className='bg-white  p-2 border w-full border-gray-200 rounded-lg'>
                    <div className='p-8 flex items-center border-b border-gray-200 gap-4'>

                        <div className='p-2 bg-blue-50 rounded-sm'>
                            <Layers className=' w-4 h-4 text-blue-400' />
                        </div>

                        <p className='text-sm font-bold   tracking-wider whitespace-nowrap leading-none '>Từ đồng nghĩa</p>
                    </div>
                    <div className='p-4 rounded-full  '>
                        <div className='  flex flex-col gap-2 p-5 hover:bg-blue-50 border-blue-100 border  rounded-lg  mt-4'>
                            <p className='text-sm font-semibold   tracking-wider whitespace-nowrap leading-none group-hover:text-blue-400'>discard</p>
                            <p className='text-muted  text-sm font-lora'>vứt bỏ vật chất không còn cần thiết</p>
                        </div>


                    </div>

                </div>
            </div>
        </div>

    )
}

export default ReviewPage