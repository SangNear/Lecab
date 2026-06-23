import { DynamicIcon } from 'lucide-react/dynamic'
import React from 'react'

interface StatItemProps {
    iconName: any
    iconColor?: string
    title: string
    value: number | string
}
const colorMap: Record<string, { bg: string; icon: string }> = {
    green: { bg: 'bg-green-400/20', icon: 'text-green-400' },
    orange: { bg: 'bg-orange-400/20', icon: 'text-orange-400' },
    yellow: { bg: 'bg-yellow-400/20', icon: 'text-yellow-400' },
    red: { bg: 'bg-red-400/20', icon: 'text-red-400' },
    // thêm màu khác tùy nhu cầu
}

const StatItem = ({ iconName, iconColor, title, value }: StatItemProps) => {

    const colors = colorMap[iconColor || 'orange'] ?? colorMap['orange']
    return (
        <div className='bg-sidebar  border border-orange-900/10 p-4 rounded-2xl '>
            <div className={`mb-4  ${colors.bg} w-fit rounded-xl`}>
                <DynamicIcon name={iconName} className={`${colors.icon} size-10 p-2 rounded-xl`} />
            </div>
            <p className='text-xs text-muted uppercase font-bold tracking-wider mb-1'>{title}</p>
            <p className='text-2xl font-bold text-accent'>{value}</p>
        </div>
    )
}

export default StatItem