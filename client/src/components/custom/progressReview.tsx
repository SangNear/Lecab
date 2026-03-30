import React from 'react'
import { Progress } from '../ui/progress'

const ProgressReview = () => {
    return (
        <div className='flex items-center justify-center gap-2 border border-gray-200 rounded-full py-4 px-6 '>
            <p className='text-gray-500 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap leading-none'>Tiến trình ôn tập</p>
            <Progress value={50} className=" flex-1 w-full max-w-3xl leading-none transition-all duration-300" />
            <p className='text-muted text-xs leading-none tracking-[0.816px] font-sans font-weight-[300] text-center'>1 of 2</p>
        </div>
    )
}

export default ProgressReview