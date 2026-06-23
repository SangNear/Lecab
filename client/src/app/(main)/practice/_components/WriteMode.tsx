import { BasePracticeItem } from '@/lib/generatePractice'
import { useEffect, useState } from 'react'
import { PracticeResult } from '../page'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Lightbulb, LogOut, XCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { playFeedbackSound } from '@/lib/audio'
import { motion } from 'motion/react'
interface WriteModeProps {
    listWrite: BasePracticeItem[]
    onFinish: (result: PracticeResult<"write", BasePracticeItem[]>) => void
}

const WriteMode = ({ listWrite, onFinish }: WriteModeProps) => {
    const [questionState, setQuestionState] = useState<BasePracticeItem[]>(() => listWrite.map((item) => ({ ...item, status: "pending" })));
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [revealedCount, setRevealedCount] = useState(0)
    const [userInput, setUserInput] = useState<string>("")

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const answer = listWrite[currentQuestion]?.correctAnswer ?? ""
    const isCorrect = userInput.trim() === questionState[currentQuestion].correctAnswer;



    const handleCheck = () => {
        playFeedbackSound(isCorrect);
        setIsChecked(true)

        setQuestionState((prev) => {
            return prev.map((question, i) => {
                if (i === currentQuestion) {
                    return { ...question, status: isCorrect ? "correct" : "incorrect", userChoice: userInput.trim() }
                }
                return question
            })
        })
    }

    const handleNextQuestion = () => {
        if (currentQuestion >= listWrite.length - 1) {
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
                practiceType: "write",
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
        if (currentQuestion < listWrite.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setIsChecked(false);
            setUserInput("");
            setRevealedCount(0)
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="w-full rounded-lg shadow-xl/10 p-4 border border-border bg-sidebar">
                <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">
                        Câu hỏi {currentQuestion + 1}/{listWrite.length}
                    </p>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 p-2 font-semibold cursor-pointer hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 text-red-500"
                    >
                        <LogOut />
                        <span>Thoát</span>
                    </Button>
                </div>
                <Progress value={((currentQuestion + 1) / listWrite.length) * 100} className="w-full py-4" />
            </div>

            <div className='bg-sidebar rounded-lg max-w-5xl mt-10 flex flex-col items-center justify-center py-10 shadow-lg px-4'>
                <p className='p-2 text-accent rounded-lg uppercase text-xs font-bold tracking-wider'>Định nghĩa</p>
                <p className='text-4xl font-lora font-bold italic tracking-wider text-center'>
                    {listWrite[currentQuestion]?.questionText}
                </p>

                <div className='mt-10 flex flex-col gap-4 items-center'>
                    {/* Blank boxes */}
                    <div className='flex items-center gap-1 flex-wrap justify-center'>
                        {answer.split("").map((char, i) =>
                            char === " " ? (
                                <div key={i} className='w-6' />
                            ) : (
                                <div key={i} className='flex flex-col items-center'>
                                    <span className='text-2xl font-bold w-8 text-center text-accent'>
                                        {i < revealedCount ? char : ""}
                                    </span>
                                    <div className='w-8 h-0.5 bg-accent mt-1' />
                                </div>
                            )
                        )}
                    </div>

                    {/* Số ký tự */}
                    <p className='text-xs text-muted-foreground'>
                        Từ này gồm <span className='font-bold text-accent'>{answer.replace(/ /g, "").length} ký tự</span>
                    </p>

                    {/* Nút gợi ý */}
                    <Button
                        onClick={() => setRevealedCount(prev => Math.min(prev + 1, answer.length))}
                        disabled={revealedCount >= answer.length}
                        className='p-4 bg-sidebar border border-accent rounded-lg hover:bg-accent/10 cursor-pointer hover:scale-95'
                    >
                        <Lightbulb className='text-accent' size={16} />
                        <span className='text-sm text-accent'>Gợi ý</span>
                    </Button>
                </div>
            </div>

            <div className='flex items-center w-full mt-5  justify-center gap-4'>
                <Input
                    type="text"
                    value={userInput}
                    autoFocus
                    placeholder='Gõ từ tương ứng với nghĩa...'
                    onChange={(e) => setUserInput(e.target.value.trim())}
                    disabled={isChecked}
                    className={`md:w-1/2  font-bold bg-sidebar  outline-none  py-6 border border-accent rounded-lg text-center ${isChecked ? (isCorrect ? 'border-emerald-500 text-emerald-400' : 'border-rose-500 text-rose-400') : 'border-gray-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'}   `}
                />

                {!isChecked && (
                    <Button
                        onClick={() => { handleCheck(); }}
                        disabled={!userInput.trim()} // chỉ cho next khi đã chọn
                        className="rounded-lg cursor-pointer hover:-translate-y-1 text-right p-6 disabled:opacity-50"
                    >
                        Kiểm tra <ArrowRight />
                    </Button>
                )}

                {isChecked && (
                    <Button
                        onClick={() => { handleNextQuestion(); }}
                        disabled={!userInput.trim()} // chỉ cho next khi đã chọn
                        className=" rounded-lg cursor-pointer hover:-translate-y-1 text-right p-6 disabled:opacity-50"
                    >
                        Câu tiếp theo <ArrowRight />
                    </Button>
                )}

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
        </div>
    )
}

export default WriteMode