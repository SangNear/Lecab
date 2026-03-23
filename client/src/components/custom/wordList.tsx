"use client";
import { useGetWordsQuery } from '@/services/word';
import WordItem from './wordItem'

const WordList = () => {
    const { data, isLoading, error } = useGetWordsQuery();

    return (
        <div className='mt-8 flex flex-col'>
            <div className="text-[0.72rem] tracking-[0.08em] uppercase text-[#B0ACA8] font-normal mb-3 pb-2 border-b border-[#E8E5E0]">Your Vocabulary</div>

            {data?.map((word) => (
                <WordItem
                    key={word._id}
                    word={word.name}
                    definition={word.define}
                    status={word.status}
                />
            ))}


        </div>
    )
}

export default WordList