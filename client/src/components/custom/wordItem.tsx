

interface WordItemProps {
    word: string
    definition: string
    status: string
}

const WordItem = ({ word, definition, status }: WordItemProps) => {
    return (
        <div className='flex items-center justify-between gap-4 py-3 border-b border-border'>
            <span className='font-lora text-[15.2px] text-foreground min-w-[110px]'>{word}</span>
            <span className='text-base text-muted font-normal '>{definition}</span>
            <span className='text-xs rounded-sm bg-accent px-2 py-1 whitespace-nowrap'>{status}</span>
        </div>
    )
}

export default WordItem