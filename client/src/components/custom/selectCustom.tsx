import { useState, useRef, useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Option {
    value: string
    label: string
}

interface CustomSelectProps {
    value: string
    onChange: (value: string) => void
    options: Option[]
    placeholder?: string
    error?: string
    label?: string
    className?: string
}

const CustomSelect = ({ value, onChange, options, placeholder = 'Chọn...', error, label, className }: CustomSelectProps) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const selected = options.find(opt => opt.value === value)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={cn('flex flex-col gap-2', className)} ref={ref}>
            {label && (
                <label className='text-sm uppercase font-semibold tracking-widest text-muted'>
                    {label}
                </label>
            )}
            <div className='relative'>
                <button
                    type="button"
                    onClick={() => setOpen(prev => !prev)}
                    className='flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm cursor-pointer  transition-colors'
                >
                    <span className={cn(!selected && 'text-muted-foreground')}>
                        {selected ? selected.label : placeholder}
                    </span>
                    <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
                </button>

                {open && (
                    <div className='absolute z-9999 mt-1 w-full rounded-md border border-input bg-popover shadow-md overflow-hidden
                        animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-100'>
                        {options.map((opt) => (
                            <button
                                type="button"
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value)
                                    setOpen(false)
                                }}
                                className='flex w-full items-center px-3 py-2 text-sm hover:bg-accent/10 cursor-pointer transition-colors'
                            >
                                <Check className={cn(
                                    'mr-2 h-4 w-4',
                                    value === opt.value ? 'opacity-100' : 'opacity-0'
                                )} />
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>
    )
}

export default CustomSelect