import { WordType } from '@/store/api/wordApi';
import { Loader2 } from 'lucide-react'
import WordCardItem from './wordCardItem';


interface WordCardListProps {
    isLoading: boolean;
    filteredWords: WordType[];
}


const WordCardList = ({ isLoading, filteredWords }: WordCardListProps) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-6'>
            {isLoading ? (
                <div className='flex items-center justify-center'>
                    <Loader2 className='w-10 h-10 animate-spin' />
                </div>
            ) : filteredWords && filteredWords?.length > 0 ? filteredWords?.map((item) => (
                <WordCardItem key={item.id} item={item} />
            )) : filteredWords && filteredWords?.length === 0 ? (
                <div className='flex items-center justify-center'>
                    <p className='text-muted text-sm font-semibold'>Không có từ nào</p>
                </div>
            ) : null}
        </div>
    )
}

export default WordCardList