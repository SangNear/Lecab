import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { speak } from '@/lib/audio'
import { FlashCardItem } from '@/lib/generatePractice'
import { useUpdateWordReviewMutation } from '@/store/api/wordApi'
import { Check, ChevronDown, LogOut, Volume2 } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

interface FlashCardProps {
    listFlashCard: FlashCardItem[]
}

interface Result {
    wordId: string
    word: string
    meaning: string
    performance: 'again' | 'vague' | 'easy'
    duration: number
    nextDay: string
    nextInterval: number
}

const FlashCardMode = ({ listFlashCard }: FlashCardProps) => {

    const startTimeRef = useRef<number | null>(null);
    const [currentWord, setCurrentWord] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [updateWordReview] = useUpdateWordReviewMutation()
    const [result, setResult] = useState<Result[]>([])
    const [showResult, setShowResult] = useState(false)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault() // ngăn page scroll
                setIsFlipped(prev => !prev)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        startTimeRef.current = Date.now();

        return () => {
            startTimeRef.current = null;
        }
    }, [currentWord]);
    console.log("index", currentWord);
    console.log("tổng", listFlashCard.length);
    const handleNext = async (performance: 'again' | 'vague' | 'easy', wordId: string) => {
        try {
            const endTime = Date.now();
            const diffInSeconds = (endTime - startTimeRef.current!)

            if (currentWord < listFlashCard.length) {
                const res = await updateWordReview({
                    wordId,
                    duration: diffInSeconds,
                    performance,
                }).unwrap();

                const newResult = [...result, {
                    wordId,
                    word: listFlashCard[currentWord].word,
                    meaning: listFlashCard[currentWord].meaning,
                    performance,
                    duration: diffInSeconds,
                    nextDay: res.nextReviewDate,
                    nextInterval: res.nextInterval
                }];

                setResult(newResult);
                setCurrentWord(currentWord + 1);


            }

            if (currentWord >= listFlashCard.length - 1) {
                // TODO: finish practice
                console.log("kết quả", result);

            }
        } catch (error) {
            console.error("Error updating word review:", error);
        }

    }
    const handleEndPractice = () => {
        // TODO: finish practice
        console.log("kết quả", result);
    }
    const totalWords = result.length;
    const rememberedWords = result.filter(item => item.performance === 'easy').length;
    const forgotWords = result.filter(item => item.performance === 'again').length;
    const unsureWords = result.filter(item => item.performance === 'vague').length;
    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-4 overflow-hidden">
            {currentWord >= listFlashCard.length ? (
                <div className="flex flex-col items-center justify-center gap-5">
                    <div className="w-fit rounded-full shadow-md p-4 bg-sidebar">
                        <Check />
                    </div>
                    <p className="font-bold text-lg">Hoàn thành phiên ôn tập</p>
                    <div className='border border-muted/10 w-full max-w-150 rounded-lg'>
                        <div className='flex flex-col items-center p-4'>
                            <p className='text-muted/60  text-sm font-semibold tracking-wider'>Tổng từ đã ôn</p>
                            <span className='text-4xl font-bold'>{totalWords}</span>
                        </div>
                        <div className='grid grid-cols-3 border-t border-muted/10 p-4'>
                            <div className='col-span-1 flex flex-col items-center gap-2'>
                                <p className='   tracking-wider p-2 rounded-lg text-xs bg-green-500/50 text-white'>Nhớ rõ</p>
                                <span className='text-xl font-bold'>{rememberedWords}</span>
                            </div>
                            <div className='col-span-1 flex flex-col items-center gap-2 border-x border-muted/10'>
                                <p className='   tracking-wider p-2 rounded-lg text-xs bg-yellow-500/50 text-white'>Nhớ</p>
                                <span className='text-xl font-bold'>{unsureWords}</span>
                            </div>
                            <div className='col-span-1 flex flex-col items-center gap-2'>
                                <p className='   tracking-wider p-2 rounded-lg text-xs bg-red-500/50 text-white'>Quên</p>
                                <span className='text-xl font-bold'>{forgotWords}</span>
                            </div>
                        </div>
                    </div>

                    <div className='w-full max-w-150'>
                        <div onClick={() => setShowResult(!showResult)} className=' flex items-center justify-center gap-1 p-1 px-2 bg-muted/10 rounded-lg cursor-pointer  hover:font-semibold transition-all duration-150'>
                            <p className='text-xs text-foreground/70 '>{showResult ? 'Thu gọn' : 'Xem chi tiết kết quả'}</p>
                            <ChevronDown className={`${showResult ? 'rotate-180' : ''} transition-transform duration-150`} size={14} />
                        </div>
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }} className='mt-4  w-full'>
                                <p className='text-xs text-foreground/70 '>Thời gian trung bình : 3.1 giây</p>
                                <div className='w-full rounded-lg border border-muted/10 overflow-hidden mt-2 h-80 overflow-y-auto'>
                                    {result.map((item, index) => (
                                        <div key={index} className='grid grid-cols-4 p-4 border-b border-muted/10 '>
                                            <div className='flex flex-col col-span-3'>
                                                <p className=' font-bold'>{item.word} : <span className='text-muted/50'>{item.meaning}</span></p>
                                                <p className='text-xs text-foreground/70 '>Thời gian : {item.duration} giây</p>
                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <p className='text-xs text-foreground/70 '>Trạng thái : {item.performance === 'easy' ? 'Nhớ rõ' : item.performance === 'vague' ? 'Nhớ' : 'Quên'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                </div>
            ) : (
                <>
                    <div className="w-full rounded-lg shadow-md p-4 bg-sidebar">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-lg">
                                Câu hỏi {currentWord + 1}/{listFlashCard.length}
                            </p>
                            <Button
                                onClick={handleEndPractice}
                                variant="outline"
                                className="flex items-center gap-2 p-2 font-semibold cursor-pointer hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 text-red-500"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Thoát</span>
                            </Button>
                        </div>
                        <Progress value={10} className="w-full mt-4" />
                    </div>

                    {/* --- KHU VỰC FLIP CARD --- */}
                    <div
                        className="w-full max-w-xl mx-auto h-115 perspective-distant cursor-pointer "
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div
                            className={`relative w-full h-full  transition-transform duration-500 transform-3d   ${isFlipped ? 'transform-[rotateY(180deg)] ' : ''
                                }`}
                        >
                            {/* Mặt trước (Front) */}
                            <div className="absolute inset-0 w-full h-full rounded-2xl border bg-sidebar p-6 flex flex-col items-center gap-4 shadow-lg backface-hidden">

                                <div className="">
                                    <Image
                                        src="https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&auto=format&fit=crop&q=60"
                                        alt="Placeholder"
                                        width={1400}
                                        height={1400}
                                        className="w-full h-52 rounded-xl object-cover bg-cover"
                                    />
                                </div>
                                <div className='flex flex-col items-center '>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl text-accent font-bold text-center">
                                        {listFlashCard[currentWord]?.word}
                                    </h2>
                                    <div className='flex items-center gap-4' onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => speak(listFlashCard[currentWord]?.word || '', 'us')}
                                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold  border border-border hover:bg-accent hover:text-white hover:border-accent transition-all"
                                            title="Nghe phát âm giọng Mỹ (US)"
                                        >
                                            <Volume2 className="w-3.5 h-3.5" />
                                            <span>US</span>
                                        </button>
                                        <button
                                            onClick={() => speak(listFlashCard[currentWord]?.word || '', 'uk')}
                                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold  border border-border hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all"
                                            title="Nghe phát âm giọng Anh (UK)"
                                        >
                                            <Volume2 className="w-3.5 h-3.5" />
                                            <span>UK</span>
                                        </button>
                                    </div>

                                    <p className='text-muted mt-2 italic text-xs'>/abc/</p>

                                    <p className='bg-muted/10 py-1 rounded-full px-2 mt-4  uppercase text-xs font-bold'>{listFlashCard[currentWord]?.partOfSpeech}</p>
                                </div>
                                <p className="text-xs text-muted-foreground mt-5 italic">(Nhấn Space hoặc Click để lật  )</p>
                            </div>

                            {/* Mặt sau (Back) */}
                            <div className="absolute flex flex-col items-center justify-center inset-0 w-full rounded-2xl border bg-sidebar  p-6  shadow-lg backface-hidden transform-[rotateY(180deg)]">



                                <div className="py-2 w-full rounded-2xl  mt-4">

                                    <p className="text-xl md:text-3xl font-extrabold mt-1 text-center ">
                                        {listFlashCard[currentWord]?.meaning}
                                    </p>
                                </div>
                                <div className="p-3 rounded-2xl w-full  flex items-center justify-center">
                                    <p className={`text-sm italic  leading-relaxed font-semibold text-center`}>
                                        {listFlashCard[currentWord]?.example}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* ------------------------- */}

                    {/* Bạn có thể thêm các nút Next / Previous ở đây */}
                    <div className=' max-w-xl w-full py-4 rounded-lg mx-auto grid grid-cols-3 gap-4'>
                        <Button onClick={() => handleNext('again', listFlashCard[currentWord]?.wordId)} className="py-6 rounded-md bg-red-500 cursor-pointer hover:opacity-80">Quên</Button>
                        <Button onClick={() => handleNext('vague', listFlashCard[currentWord]?.wordId)} className="py-6 rounded-md bg-blue-500 cursor-pointer hover:opacity-80">Nhớ lơ mơ</Button>
                        <Button onClick={() => handleNext('easy', listFlashCard[currentWord]?.wordId)} className="py-6 rounded-md bg-green-500 cursor-pointer hover:opacity-80">Nhớ</Button>
                    </div>
                </>
            )}
            {/* Header & Progress */}

        </div>
    )
}

export default FlashCardMode