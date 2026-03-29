"use client"
import React from 'react'
import { sidebarItems } from './sidebar'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

const BottomBar = () => {
    const pathname = usePathname()
    return (
        <div className='h-16 lg:hidden  border-t flex items-center justify-around border-gray-200  bottom-0 left-0 right-0 bg-white fixed  z-50'>
            {sidebarItems.map((item) => (
                <Link key={item.href} href={item.href} className={`flex flex-col items-center transition-all duration-300  rounded-sm p-2 border-gray-100 ${pathname === item.href ? 'bg-orange-50' : 'bg-white'}`}>
                    <item.icon className={`w-5 h-5 ${pathname === item.href ? 'text-orange-500' : 'text-gray-400'}`} />
                    {pathname === item.href && <span className='   text-lora text-sm text-orange-500 font-semibold '>{item.label}</span>}
                </Link>
            ))}
        </div>
    )
}

export default BottomBar