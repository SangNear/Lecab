

import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

const AddWordPage = () => {
  return (
    <div>
      <Link href='/' className='flex items-center gap-1 text-sm text-muted hover:text-foreground mb-8'>
        <ArrowLeftIcon className='w-4 h-4' />
        <span>Back</span>
      </Link>
      <h1 className='text-4xl md:text-5xl font-serif font-bold italic tracking-tight mb-4 text-center'>Tạo thẻ từ mới</h1>
      <p className='text-subtle font-medium text-center' >Lưu trữ từ vựng mới và để AI giúp bạn hoàn thiện ví dụ.</p>

    </div>
  )
}

export default AddWordPage