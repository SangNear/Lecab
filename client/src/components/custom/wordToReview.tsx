import { WordType } from '@/store/api/wordApi'
import { Volume2 } from 'lucide-react'
import React from 'react'

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
            <p className='tracking-wider text-subtle text-sm uppercase mb-4'>
                {isRevealed ? 'meaning' : 'tap to reveal'}
            </p>
            <div onClick={handleVoice} className='absolute top-4 right-4 p-2 rounded-sm bg-surface text-muted cursor-pointer hover:translate-y-[-5px] duration-150 hover:shadow-lg hover:bg-accent hover:text-primary-foreground'>
                <Volume2 />
            </div>
            <p className='text-foreground text-[38px] font-lora'>{currentWord?.word}</p>
            {isRevealed && <p className='text-foreground text-[16px] mt-4'>{currentWord?.meaning}</p>}
            {isRevealed && <p className='text-subtle text-[14px] italic mt-3'>{currentWord?.example[0]}</p>}
            <div className='absolute bottom-4 flex gap-1'>
                <span className='w-1.5 h-1.5 rounded-full bg-border'></span>
                <span className='w-1.5 h-1.5 rounded-full bg-border'></span>
                <span className='w-1.5 h-1.5 rounded-full bg-border'></span>
            </div>
        </div>
    )
}

export default WordToReview
