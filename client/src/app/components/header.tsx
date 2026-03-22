import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const HeaderComponent = () => {
    return (
        <div className='bg-transparent flex items-center justify-between  w-full mx-auto mb-10'>
            {/* <span className='font-lora text-[20px] text-foreground space-x-0.5'>Lexis</span> */}
            <Link href="/">
                <Image src="/logo.svg" alt="logo" width={50} height={100} className='w-40 ' />
            </Link>

            <span className='font-sans text-[0.75rem] text-muted font-weight-[300] space-x-3'>7 words total</span>
        </div>
    )
}

export default HeaderComponent