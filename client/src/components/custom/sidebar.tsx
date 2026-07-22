"use client"
import { useAppSelector } from '@/store/hooks'
import { useTheme } from '@/components/theme-provider'
import { BookHeart, BookOpen, HomeIcon, LogOutIcon, Plus, RotateCw, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'motion/react'
const MotionLink = motion(Link)
export const sidebarItems = [
    {
        icon: HomeIcon,
        href: "/dashboard",
        label: "Trang chủ"
    },
    // {
    //     icon: RotateCw,
    //     href: "/review",
    //     label: "Ôn tập"
    // },
    {
        icon: Zap,
        href: "/practice",
        label: "Luyện tập"
    },
    {
        icon: BookHeart,
        href: "/words",
        label: "Từ vựng"
    },
    {
        icon: BookOpen,
        href: "/library",
        label: "Bộ từ"
    },
    {
        icon: Sparkles,
        href: "/dictionary",
        label: "Từ điển"
    },


]

const Sidebar = () => {
    const pathname = usePathname()
    const user = useAppSelector((state) => state.auth.user)
    const { theme } = useTheme()
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    const sidebarTextColor = theme === 'dark' ? 'text-white' : 'text-black'

    return (
        <div className=' hidden bg-accent/10 lg:flex flex-col max-w-62.5 min-w-62.5 h-screen  sticky top-0 left-0 '>
            <div className='p-8 '>
                <Image src="/logo.svg" alt="logo" width={40} height={40} className='w-full h-auto' />

            </div>
            <nav className='p-4 flex-1'>
                {sidebarItems.map((item) => (
                    <MotionLink
                        className={`flex mt-2 relative  gap-2 p-4  items-center rounded-2xl  group transition-all duration-300
                            `}
                        href={item.href}
                        key={item.href}
                    >
                        {pathname === item.href && (
                            <motion.span
                                layoutId="sidebar-active-bg"
                                className="absolute inset-0 rounded-2xl bg-accent-soft"
                                transition={{ type: 'spring', stiffness: 900, damping: 45 }}
                            />
                        )}
                        <item.icon
                            className={`w-4 h-4 z-10    ${pathname === item.href ? 'text-accent' : 'group-hover:translate-x-2 transition-all duration-300'}`}
                        />
                        <span
                            className={`font-semibold z-10 font-sans text-sm transition-all duration-300
                         ${pathname === item.href ? 'text-accent' : 'group-hover:translate-x-2 '}`}>
                            {item.label}
                        </span>
                    </MotionLink>
                ))}
            </nav>
            <div className='flex items-center gap-2  pb-6 px-4 '>
                {user && (
                    <>
                        <Image src={user?.avatarUrl || "https://github.com/evilrabbit.png"}
                            alt="avatar"
                            width={30}
                            height={30}
                            className='w-10 h-10 rounded-full'
                        />
                        <div className='flex flex-col gap-2'>
                            <span className={`font-semibold text-sm ${sidebarTextColor}`}>{user?.name}</span>
                            <span className={`font-semibold text-sm  ${sidebarTextColor}`}>{user?.email}</span>
                        </div>

                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;