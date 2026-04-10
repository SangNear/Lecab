"use client"
import ButtonCustom from '@/components/custom/buttonCustom'
import EmptyReview from '@/components/custom/emptyReview'
import ProgressReview from '@/components/custom/progressReview'
import SynonymComponent from '@/components/custom/synonym'
import WordToReview from '@/components/custom/wordToReview'

import { useGetSynonymsQuery, useGetWordsToReviewQuery, useUpdateWordReviewMutation, WordType } from '@/store/api/wordApi'
import { Check, CornerDownLeft } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'


const ReviewPage = () => {

    const [currentIndex, setCurrentIndex] = useState(0)
    

    const { data: wordsToReview = [], isLoading: isLoadingWordsToReview } = useGetWordsToReviewQuery(undefined, {
        refetchOnMountOrArgChange: true
    })
    const [updateWordReview, { isLoading }] = useUpdateWordReviewMutation()


    const currentWord = wordsToReview?.[currentIndex]
    const { data: synonymsData = [] } = useGetSynonymsQuery(
        { wordId: currentWord?.id ?? '' },
        { skip: !currentWord?.id },
    )

    const [isRevealed, setIsRevealed] = useState(false)
    const handleRevealed = async () => {
        setIsRevealed(true)
    }
    const voice = useMemo(() => new SpeechSynthesisUtterance(currentWord?.word), [currentWord?.word])

    const handleVoice = () => {
        speechSynthesis.speak(voice)
    }
    const startTimeRef = useRef<number | null>(null);

    

    useEffect(() => {
        startTimeRef.current = Date.now();
    }, [currentWord]);

    const handleNextWord = async (performance: "again" | "easy") => {
        const endTime = Date.now();
        const diffInSeconds = (endTime - startTimeRef.current!)

        console.log({
            wordId: currentWord?.id,
            performance: performance,
            timeInSeconds: diffInSeconds,
        });

        if (currentWord) {
            await updateWordReview({
                wordId: currentWord?.id,
                performance: performance,
                duration: diffInSeconds,
            })
                .unwrap()
                .then((res) => {
                    console.log("res", res)
                    toast.success("Sẽ review sau vài ngày nữa")
                    setCurrentIndex(currentIndex + 1)
                    
                    setIsRevealed(false)
                })
                .catch((err) => {
                    toast.error("Lỗi khi cập nhật đánh giá từ")
                })

        }
        else {
            console.log("end of words")
            toast.success("You have reviewed all words")
        }
    }

    return (
        <div className='flex flex-col lg:flex-row justify-evenly gap-20'>

            {isLoadingWordsToReview ? (
                <div>Đang tải...</div> // Hoặc một Skeleton UI đẹp mắt
            ) : currentWord ? (
                <>
                    <div className='flex-2 flex flex-col max-w-3xl'>
                        <ProgressReview />
                        <WordToReview
                            currentWord={currentWord}
                            isRevealed={isRevealed}
                            handleRevealed={handleRevealed}
                            handleVoice={handleVoice}
                        />

                        <div className='grid grid-cols-2 gap-4 mt-5'>

                            <ButtonCustom
                                description='review tomorrow'
                                className='bg-danger-soft rounded-[14px] border-[0.5px] border-danger-border text-danger transition-transform hover:bg-danger-hover hover:-translate-y-0.25 duration-150'
                                title='Again'
                                icon={<CornerDownLeft />}
                                onClick={() => handleNextWord("again")}

                            />
                            <ButtonCustom
                                description='review in 3 days'
                                className='bg-success-soft rounded-[14px] border-[0.5px] border-success-border text-success transition-transform hover:brightness-95 hover:-translate-y-0.25 duration-150'
                                title='Easy'
                                icon={<Check />}
                                onClick={() => handleNextWord("easy")}
                            />

                        </div>
                    </div>
                    <SynonymComponent synonyms={synonymsData} />
                </>
            ) : (
                <EmptyReview />
            )}

        </div>

    )
}

export default ReviewPage