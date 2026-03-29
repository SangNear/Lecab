"use client"
import { useAppSelector } from '@/store/hooks'
import { BookOpen, HomeIcon, LogOutIcon, Plus, RotateCw, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

export const sidebarItems = [
    {
        icon: HomeIcon,
        href: "/dashboard",
        label: "Trang chủ"
    },
    {
        icon: RotateCw,
        href: "/review",
        label: "Ôn tập"
    },
    {
        icon: BookOpen,
        href: "/library",
        label: "Thư viện"
    },
    {
        icon: Sparkles,
        href: "/ai-collocations",
        label: "AI Collocations"
    },
]

const Sidebar = () => {
    const pathname = usePathname()
    const user = useAppSelector((state) => state.auth.user)
    const [openLogoutModal, setOpenLogoutModal] = useState(false)

    return (
        <div className=' hidden lg:flex flex-col max-w-[250px] min-w-[250px] h-screen bg-white sticky top-0 left-0    border-r border-gray-200'>
            <div className='p-8 '>
                <Image src="/logo.svg" alt="logo" width={40} height={40} className='w-full h-auto' />

            </div>
            <nav className='p-4 flex-1'>
                {sidebarItems.map((item) => (
                    <Link className={`flex mt-2 gap-2 p-4 items-center ${pathname === item.href ? 'rounded-2xl transition-all duration-300 bg-orange-50 ' : 'bg-white text-muted hover:bg-gray-100 rounded-2xl'}`} href={item.href} key={item.href}>
                        <item.icon className={`w-4 h-4 ${pathname === item.href ? "text-orange-500" : ""}`} />
                        <span className={`font-semibold font-lora text-sm ${pathname === item.href ? 'text-orange-500' : 'hover:text-foreground'}`}>{item.label}</span>

                    </Link>
                ))}
            </nav>
            <div className='flex items-center gap-2  pb-6 px-4 '>
                <Image src={user?.avatarUrl || "https://github.com/evilrabbit.png"}
                    alt="avatar"
                    width={30}
                    height={30}
                    className='w-10 h-10 rounded-full'
                />
                <div className='flex flex-col gap-2'>
                    <span className='font-semibold text-sm'>{user?.name}</span>
                    <span className='font-semibold text-sm'>{user?.email}</span>
                </div>
                <div>
                    <LogOutIcon className='w-4 h-4 ' onClick={() => setOpenLogoutModal(true)} />
                    
                </div>
            </div>
        </div>
    );
};

export default Sidebar;