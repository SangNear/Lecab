import React from 'react'

const HeroComponent = () => {
    return (
        <div className='px-4 pt-10 pb-8 flex flex-col items-center justify-center'>
            <div className='font-lora text-[80px] text-foreground leading-[1.1] font-weight-[400]'>
                2
            </div>
            <div className='mt-2 text-muted text-[13.6px] tracking-[0.816px] font-weight-[300] uppercase'>
                words to review
            </div>
            <div className='mt-1 text-[#B0ACA8] text-[12.8px] tracking-[0.768px] font-weight-[300]'>
                5 words ahead of schedule
            </div>
        </div>
    )
}

export default HeroComponent