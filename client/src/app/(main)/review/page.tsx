"use client"
import ButtonCustom from '@/components/custom/buttonCustom'
import ProgressReview from '@/components/custom/progressReview'
import WordToReview from '@/components/custom/wordToReview'
import { Progress } from '@/components/ui/progress'
import { useGetWordsToReviewQuery, useUpdateWordReviewMutation, WordType } from '@/store/api/wordApi'
import { Check, CornerDownLeft, Layers, Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'
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
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-center text-gray-300 text-[16px] mt-5 tracking-wider  whitespace-nowrap'>Hôm nay không có từ nào để ôn tập. Quay lại sau</p>
                    </div>
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

            <div className='hidden flex-1 md:flex flex-col items-center   w-80  max-w-80'>
                <div className='bg-white  p-2 border w-full border-gray-200 rounded-lg'>
                    <div className='p-8 flex items-center border-b border-gray-200 gap-4'>

                        <div className='p-2 bg-blue-50 rounded-sm'>
                            <Layers className=' w-4 h-4 text-blue-400' />
                        </div>

                        <p className='text-sm font-bold   tracking-wider whitespace-nowrap leading-none '>Từ đồng nghĩa</p>
                    </div>
                    <div className='p-4 rounded-full  '>
                        <div className='  flex flex-col gap-2 p-5 hover:bg-blue-50 border-blue-100 border  rounded-lg  mt-4'>
                            <p className='text-sm font-semibold   tracking-wider whitespace-nowrap leading-none group-hover:text-blue-400'>discard</p>
                            <p className='text-muted  text-sm font-lora'>vứt bỏ vật chất không còn cần thiết</p>
                        </div>


                    </div>

                </div>
            </div>
        </div>

    )
}

export default ReviewPage