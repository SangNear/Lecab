import ButtonCustom from '@/app/components/buttonCustom'
import { Plus } from 'lucide-react'
import React from 'react'

const SessionCompletePage = () => {
    return (
        <div className='py-12 px-4 flex flex-col items-center justify-center'>
            <div className='text-[40px] mb-4'>✦</div>
            <h2 className='font-lora text-[28.8px] mb-2 text-foreground'>All done for today</h2>
            <p className='text-center text-[14.8px] text-muted font-weight-[300] tracking-wider'>You reviewed 11 words. <br /> Come back tomorrow for your next session.</p>
            <ButtonCustom
                className='bg-foreground text-white transition-transform hover:bg-[#2E2C2A] hover:-translate-y-0.5 duration-150 mt-8'
                title='Back to dashboard '
                redirectTo={true}
                redirectToPath="/"
            />
            <ButtonCustom
                redirectToPath="/add-a-word"
                redirectTo={true}
                className=' text-[14.4px] mt-3 font-normal bg-transparent text-accent transition-transform hover:bg-accent/10 hover:-translate-y-0.5 duration-150 border-[0.5px] border-accent rounded-[14px]'
                title='Add more words'
                icon={<Plus />}
            />
        </div>
    )
}

export default SessionCompletePage