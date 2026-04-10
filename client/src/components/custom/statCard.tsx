import React from 'react'

const StatCard = ({ title, value }: { title: string, value: number }) => {
    return (
        <div className='px-4 py-5 flex flex-col items-center justify-center bg-card rounded-[14px] border border-border'>
            <div className='font-lora text-2xl text-foreground'>{value}</div>
            <div className='mt-[3.2px] font-extralight text-subtle uppercase text-xs'> {title} </div>
        </div>
    )
}

export default StatCard