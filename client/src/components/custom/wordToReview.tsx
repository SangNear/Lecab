import { WordType } from '@/store/api/wordApi'
import { Volume2 } from 'lucide-react'
import React, { useState } from 'react'

interface WordToReviewProps {
    currentWord: WordType
    isRevealed: boolean
    handleRevealed: () => void
    handleVoice: () => void
}

const WordToReview = ({ currentWord, isRevealed, handleRevealed, handleVoice }: WordToReviewProps) => {
    
    return (
        <div
            onClick={handleRevealed}
            className={`py-10 px-8 mt-12  flex flex-col items-center justify-center border 
                                border-border rounded-lg bg-card relative min-h-[280px] 
                                ${isRevealed ? "" : "hover:translate-y-[-5px] duration-150 hover:shadow-lg cursor-pointer"} `}
        >
            <p className='tracking-wider text-[#C8C5C0] text-sm uppercase mb-4'>
                {isRevealed ? 'meaning' : 'tap to reveal'}
            </p>
            <div onClick={handleVoice} className='absolute top-4 right-4 p-2 rounded-sm bg-gray-100 text-muted cursor-pointer hover:translate-y-[-5px] duration-150 hover:shadow-lg hover:bg-orange-300 hover:text-white'>
                <Volume2 />
            </div>
            <p className='text-foreground text-[38px] font-lora'>{currentWord?.word}</p>
            {isRevealed && <p className='text-[#4a4845] text-[16px] mt-4'>{currentWord?.meaning}</p>}
            {isRevealed && <p className='text-[#B0ACA8] text-[14px] italic mt-3'>{currentWord?.example[0]}</p>}
            <div className='absolute bottom-4 flex gap-1'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#e0ddd8]'></span>
                <span className='w-1.5 h-1.5 rounded-full bg-[#e0ddd8]'></span>
                <span className='w-1.5 h-1.5 rounded-full bg-[#e0ddd8]'></span>
            </div>
        </div>
    )
}

export default WordToReview