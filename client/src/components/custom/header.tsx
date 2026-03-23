"use client"

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import ButtonCustom from './buttonCustom'
import { clearCredentials } from '@/store/slices/authSlices'
import { Button } from '@/components/ui/button'
import { useLogoutMutation } from '@/store/api/authApi'
import { useRouter } from 'next/navigation'
import { Bell, Plus, SeparatorHorizontal } from 'lucide-react'
const HeaderComponent = () => {
    const user = useAppSelector((state) => state.auth.user)
    const [logout, { isLoading }] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const router = useRouter()
    return (
        <header className='bg-white h-20  lg:px-20 px-10  flex items-center justify-between  w-full  '>
            <p className='text-lg font-lora italic font-bold'>Tổng quan học tập</p>
            <div className='flex items-center gap-2'>
                <button className='flex items-center gap-2 py-1 px-2 md:py-2.5 md:px-5 bg-orange-500 text-white rounded-md font-semibold tracking-tighter hover:bg-orange-600 transition-all duration-300'>
                    <Plus />
                    <span className='hidden md:block'>Thêm từ</span>
                </button>
                <span className='px-2'>|</span>
                <Bell />
            </div>
            

        </header>
    )
}

export default HeaderComponent