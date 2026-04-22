"use client"
import React from 'react'
import { sidebarItems } from './sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
const BottomBar = () => {
    const pathname = usePathname()
    return (
        <div className='h-16 lg:hidden border-t border-border flex items-center bottom-0 left-0 right-0 bg-card fixed z-50'>
            {sidebarItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className='relative flex flex-col items-center  rounded-sm flex-1 h-full justify-center'
                >
                    {/* Animated background */}
                    {pathname === item.href && (
                        <motion.span
                            layoutId="bottombar-active-bg"
                            className="absolute inset-0 rounded-sm bg-accent-soft"
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                    )}

                    <item.icon className={`relative z-10 w-5 h-5 transition-colors duration-300 ${pathname === item.href ? 'text-accent' : 'text-subtle'
                        }`} />

                    
                </Link>
            ))}
        </div>
    )
}

export default BottomBar