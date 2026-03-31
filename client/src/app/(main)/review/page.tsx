"use client"
import ButtonCustom from '@/components/custom/buttonCustom'
import EmptyReview from '@/components/custom/emptyReview'
import ProgressReview from '@/components/custom/progressReview'
import SynonymComponent from '@/components/custom/synonym'
import WordToReview from '@/components/custom/wordToReview'

import { useGetWordsToReviewQuery, useUpdateWordReviewMutation } from '@/store/api/wordApi'
import { Check, CircleCheck, CornerDownLeft, Zap } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'


const ReviewPage = () => {

    const [currentIndex, setCurrentIndex] = useState(0)


    const { data: wordsToReview = [] } = useGetWordsToReviewQuery()
    const [updateWordReview, { isLoading }] = useUpdateWordReviewMutation()

    const currentWord = wordsToReview?.[currentIndex]

    const [isRevealed, setIsRevealed] = useState(false)
    const handleRevealed = () => {
        setIsRevealed(true)

    }
    const voice = new SpeechSynthesisUtterance(currentWord?.word)

    const handleVoice = () => {
        speechSynthesis.speak(voice)
    }

    const handleNextWord = async (performance: "again" | "easy") => {
        console.log("performance", performance);
        if (currentIndex <= wordsToReview.length - 1) {
            await updateWordReview({
                wordId: currentWord?.id,
                performance: performance,
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
        <div className='flex     justify-evenly gap-20'>
            <div className=' flex-2 flex flex-col max-w-3xl'>

                {currentWord ? <ProgressReview /> : null}

                {currentWord ?
                    <WordToReview
                        currentWord={currentWord}
                        isRevealed={isRevealed}
                        handleRevealed={handleRevealed}
                        handleVoice={handleVoice}
                    />
                    :
                    <EmptyReview />
                }


                {currentWord ?
                    <div className='grid grid-cols-2 gap-4 mt-5'>
                        <ButtonCustom
                            description='review tomorrow'
                            className='bg-[#Fdf3ec] rounded-[14px] border-[0.5px] border-[#edd8c0] text-danger transition-transform hover:bg-[#f8e9d8] hover:-translate-y-0.25 duration-150'
                            title='Again'
                            icon={<CornerDownLeft />}
                            onClick={() => handleNextWord("again")}

                        />
                        <ButtonCustom
                            description='review in 3 days'
                            className='bg-[#EEF5F0] rounded-[14px] border-[0.5px] border-[#B2CDB9] text-[#3E7256] transition-transform hover:bg-[#DFF0E5] hover:-translate-y-0.25 duration-150'
                            title='Easy'
                            icon={<Check />}
                            onClick={() => handleNextWord("easy")}
                        />
                    </div>
                    :
                    null
                }
            </div>

            {currentWord ?
                <SynonymComponent />
                :
                null
            }
        </div>

    )
}

export default ReviewPage