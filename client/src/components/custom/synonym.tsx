import React from 'react'
import { Layers } from 'lucide-react'

const SynonymComponent = () => {
    return (
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
    )
}

export default SynonymComponent