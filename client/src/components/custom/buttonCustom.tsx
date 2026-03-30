"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

interface ButtonCustomProps {
    title: string
    redirectTo?: boolean
    icon?: React.ReactNode
    className?: string
    type?: "button" | "submit" | "reset"
    redirectToPath?: string
    description?: string
    onClick?: () => void
}

const ButtonCustom = ({ title, redirectTo, icon, className, type = "button", redirectToPath, description, onClick }: ButtonCustomProps) => {
    const router = useRouter()

    return (
        <button type={type} onClick={onClick} className={`w-full ${className} rounded-[14px] py-4 px-6 flex flex-col items-center justify-center  cursor-pointer `}>
            <div className='flex items-center justify-center'>
                {title} {icon && <span className='ml-2'>{icon}</span>}
            </div>

            {description && <p className='text-xs text-gray-400 font-sans font-weight-[300] tracking-wider'>{description}</p>}
        </button>
    )
}

export default ButtonCustom