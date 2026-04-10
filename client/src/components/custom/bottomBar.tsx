"use client"
import React from 'react'
import { sidebarItems } from './sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BottomBar = () => {
    const pathname = usePathname()
    return (
        <div className='h-16 lg:hidden border-t border-border flex items-center justify-around bottom-0 left-0 right-0 bg-card fixed z-50'>
            {sidebarItems.map((item) => (
                <Link key={item.href} href={item.href} className={`flex flex-col items-center transition-all duration-300 rounded-sm p-2 ${pathname === item.href ? 'bg-accent-soft' : 'bg-card'}`}>
                    <item.icon className={`w-5 h-5 ${pathname === item.href ? 'text-accent' : 'text-subtle'}`} />
                    {pathname === item.href && <span className='text-lora text-sm text-accent font-semibold'>{item.label}</span>}
                </Link>
            ))}
        </div>
    )
}

export default BottomBar