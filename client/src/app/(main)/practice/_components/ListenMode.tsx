"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { playFeedbackSound } from '@/lib/audio'

import { BasePracticeItem } from '@/lib/generatePractice'
import { ArrowRight, CheckCircle2, LogOut, Sliders, Volume2, XCircle } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { PracticeResult } from '../page'
import { motion } from 'motion/react'

interface ListenModeProps {
    listListen: BasePracticeItem[]
    onFinish: (result: PracticeResult<"listen", BasePracticeItem[]>) => void
}

const ListenMode = ({ listListen, onFinish }: ListenModeProps) => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0)
    const [questionState, setQuestionState] = useState<BasePracticeItem[]>(() => listListen.map((item) => ({ ...item, status: "pending" })));
    const [userInput, setUserInput] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const speakText = (text: any, rateValue: number = playbackRate) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Tắt giọng cũ đang đọc dở (nếu có)
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = rateValue;

            utterance.onstart = () => setIsPlaying(true);
            utterance.onend = () => setIsPlaying(false);
            utterance.onerror = () => setIsPlaying(false);

            window.speechSynthesis.speak(utterance);
        } else {
            // Fallback alert nếu trình duyệt không hỗ trợ SpeechSynthesis
            setIsPlaying(true);
            setTimeout(() => setIsPlaying(false), 1000);
        }
    };

    const handlePlayAudio = () => {
        speakText(questionState[currentQuestion].correctAnswer)
    }



    useEffect(() => {
        speakText(questionState[currentQuestion].correctAnswer)
    }, [currentQuestion])

    const isCorrect = userInput.trim() === questionState[currentQuestion].correctAnswer;

    const handleCheck = () => {
        playFeedbackSound(isCorrect);
        setIsChecked(true);

        setQuestionState((prev) => {
            return prev.map((question, i) => {
                if (i === currentQuestion) {
                    return { ...question, status: isCorrect ? "correct" : "incorrect", userChoice: userInput.trim() }
                }

                return question
            })
        })
    };

    const handleNextQuestion = () => {
        if (currentQuestion >= listListen.length - 1) {
            const totalQuestions = questionState.length;
            const correctCount = questionState.filter(item => item.status === "correct").length;
            const wrongCount = questionState.filter(item => item.status === "incorrect").length;
            const wrongItems = questionState.map((q) => ({
                wordId: q.wordId,
                word: q.correctAnswer ?? "",
                meaning: q.questionText ?? "",
                userChoice: q.userChoice,
                status: q.status
            }))
            onFinish({
                practiceType: "listen",
                completedAt: new Date(),
                score: Math.round((correctCount / totalQuestions) * 100),
                practiceItemsRetry: questionState.filter(item => item.status === "incorrect"),
                totalQuestions,
                correctCount,
                wrongCount,
                wrongItems: wrongItems as { wordId: string; word: string; meaning: string, userChoice: string | null, status: "correct" | "incorrect" }[],
            });
            return;
        }
        if (currentQuestion < listListen.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setIsChecked(false);
            setUserInput("");
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="w-full rounded-lg shadow-xl/10 p-4 border border-border bg-sidebar">
                <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">
                        Câu hỏi {currentQuestion + 1}/{listListen.length}
                    </p>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 p-2 font-semibold cursor-pointer hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 text-red-500"
                    >
                        <LogOut />
                        <span>Thoát</span>
                    </Button>
                </div>
                <Progress value={((currentQuestion + 1) / listListen.length) * 100} className="w-full py-4" />
            </div>

            <div className="w-full shadow-xl/10 rounded-lg  p-6 border border-border mt-10 bg-sidebar">
                <div className="flex flex-col gap-4 items-center ">
                    <div className="h-12 flex items-end justify-center gap-1 px-4 py-2 w-full max-w-50">
                        {[...Array(12)].map((_, i) => (
                            <span
                                key={i}
                                className={`w-1 rounded-full bg-orange-500/40 transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1'}`}
                                style={{
                                    height: isPlaying ? `${Math.floor(Math.random() * 28) + 10}px` : '4px',
                                    animationDelay: `${i * 0.08}s`
                                }}
                            ></span>
                        ))}
                    </div>
                    <div className={`p-4 rounded-full border border-border cursor-pointer hover:scale-90 transition-transform ${isPlaying ? 'bg-accent text-white' : ''}`}>
                        <Volume2 size={20} className={`${isPlaying ? 'text-white' : 'text-accent/50'}`} onClick={handlePlayAudio} />
                    </div>
                    <p className="text-muted font-semibold text-sm">Bấm để nghe lại âm thanh</p>
                    <div className="flex items-center gap-2 border border-border rounded-xl p-1.5 mt-2">
                        <span className="text-[10px] text-gray-500 px-2 uppercase font-bold flex items-center gap-1">
                            <Sliders className="w-3 h-3" /> Tốc độ:
                        </span>
                        {[0.5, 0.75, 1, 1.25].map((rate) => (
                            <button
                                key={rate}
                                onClick={() => {
                                    setPlaybackRate(rate);
                                    speakText(questionState[currentQuestion].correctAnswer, rate);
                                }}
                                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${playbackRate === rate ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white hover:bg-accent/50'}`}
                            >
                                {rate === 1 ? 'Chuẩn (1x)' : `${rate}x`}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex items-center w-full mt-5'>
                    <Input
                        type="text"
                        value={userInput}
                        autoComplete="on"
                        placeholder='Điền từ bạn nghe được...'
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={isChecked}
                        className={`md:w-1/2 mx-auto  outline-none  py-6 border border-accent rounded-lg text-center  ${isChecked ? (isCorrect ? 'border-emerald-500 text-emerald-400' : 'border-rose-500 text-rose-400') : 'border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'} `}
                    />
                </div>



            </div>
            {isChecked && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`p-5 mt-5 rounded-2xl  border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-scaleUp ${isCorrect ? '  border-2 border-emerald-500 text-emerald-400 bg-green-200/10' : 'bg-rose-700/10 border-rose-500/30 text-rose-400'}`}>
                    <div className="flex items-start gap-3 ">
                        {isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                        ) : (
                            <XCircle className="w-6 h-6 shrink-0 mt-0.5" />
                        )}
                        <div>
                            <h4 className="font-bold text-sm">
                                {isCorrect ? 'Tuyệt vời, câu trả lời chính xác!' : 'Tiếc quá, chưa chính xác rồi!'}
                            </h4>

                            {/* Hiển thị đáp án đúng */}
                            <div className="mt-1 text-xs text-gray-400">
                                <span>Đáp án chuẩn: </span>
                                <strong className="  px-2.5 py-1 rounded-md font-mono  inline-block mt-0.5 text-sm">
                                    {questionState[currentQuestion].correctAnswer}
                                </strong>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
            <div className="flex justify-end">

                {!isChecked && (
                    <Button
                        // onClick={handleNextQuestion}


                        onClick={() => {
                            handleCheck();
                        }}

                        disabled={!userInput.trim()} // chỉ cho next khi đã chọn
                        className="mt-4 rounded-lg cursor-pointer hover:-translate-y-1 text-right p-6 disabled:opacity-50"
                    >
                        Kiểm tra <ArrowRight />
                    </Button>
                )}

                {isChecked && (
                    <Button
                        // onClick={handleNextQuestion}


                        onClick={() => {
                            handleNextQuestion();
                        }}

                        disabled={!userInput.trim()} // chỉ cho next khi đã chọn
                        className="mt-4 rounded-lg cursor-pointer hover:-translate-y-1 text-right p-6 disabled:opacity-50"
                    >
                        Câu tiếp theo <ArrowRight />
                    </Button>
                )}
            </div>


        </div>

    )
}

export default ListenMode