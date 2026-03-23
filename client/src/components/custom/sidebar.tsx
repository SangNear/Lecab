"use client"
import { BookOpen, HomeIcon, Plus, RotateCw, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const sidebarItems = [
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
        icon: Plus,
        href: "/add-a-word",
        label: "Thêm từ mới"
    },
    {
        icon: Sparkles,
        href: "/ai-collocations",
        label: "AI Collocations"
    },
]

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div className=' hidden lg:flex flex-col max-w-[250px] min-w-[250px] bg-white  min-h-screen border-r border-gray-200'>
            <div className='p-8 '>
                <Image src="/logo.svg" alt="logo" width={40} height={40} className='w-full h-auto' />

            </div>
            <nav className='p-4 flex-5'>
                {sidebarItems.map((item) => (
                    <Link className={`flex mt-2 gap-2 p-4 items-center ${pathname === item.href ? 'rounded-2xl transition-all duration-300 bg-orange-50 ' : 'bg-white text-muted hover:bg-gray-100 rounded-2xl'}`} href={item.href} key={item.href}>
                        <item.icon className={`w-4 h-4 ${pathname === item.href ? "text-orange-500" : ""}`} />
                        <span className={`font-semibold text-sm ${pathname === item.href ? 'text-orange-500' : 'hover:text-foreground'}`}>{item.label}</span>

                    </Link>
                ))}
            </nav>
            <div className='flex items-center gap-2 flex-1 p-4'>
                <Image src="https://github.com/evilrabbit.png"
                    alt="avatar"
                    width={30}
                    height={30}
                    className='w-10 h-10 rounded-full'
                />
                <div className='flex flex-col gap-2'>
                    <span className='font-semibold text-sm'>John Doe</span>
                    <span className='font-semibold text-sm'>john.doe@example.com</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;