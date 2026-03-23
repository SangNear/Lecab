import Form from '@/components/custom/form'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AddWordPage = () => {
  return (
    <div>
      <Link href='/' className='flex items-center gap-1 text-sm text-muted hover:text-foreground mb-8'>
        <ArrowLeftIcon className='w-4 h-4' />
        <span>Back</span>
      </Link>
      <h1 className='font-lora text-[25.6px] text-foreground mb-[6.4px]'>Add a word</h1>
      <p className='text-[15.12px] text-[#B0ACA8] mb-8  tracking-wider font-extralight' >It will be queued for review today.</p>
      <Form />
    </div>
  )
}

export default AddWordPage