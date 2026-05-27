"use client"
import CustomSelect from '@/components/custom/selectCustom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, RotateCcw, SaveIcon, Settings, TriangleAlert, Trophy } from 'lucide-react'
import React, { useMemo } from 'react'
import { useGetAllCategoriesQuery } from '@/store/api/categoryApi'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useGetWordsQuery } from '@/store/api/wordApi'
import { generateQuiz, QuizItem } from '@/lib/generateQuiz'
import QuizMode from './_components/QuizMode'
import Screen1 from './_components/Screen1'

export interface PracticeResult<TRetry = undefined> {
    totalQuestions: number;
    correctCount: number;
    wrongCount: number;
    wrongItems: { wordId: string; word: string; meaning: string }[];
    practiceType: "quiz" | "input" | "flashcard";
    completedAt: Date;
    score: number;
    practiceItemsRetry?: TRetry;
}

const PracticePage = () => {

    // ─── Navigation ───────────────────────────────────────────────
    // 1: Chọn mode  2: Cấu hình  3: Luyện tập  4: Kết quả
    const [currentScreen, setCurrentScreen] = React.useState(1)
    const [selectedMode, setSelectedMode] = React.useState<"quiz" | "input" | "flashcard" | null>(null)

    // ─── Data ─────────────────────────────────────────────────────
    const { data: categories } = useGetAllCategoriesQuery()
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
    const [quantity, setQuantity] = React.useState(10)
    const { data: words } = useGetWordsQuery(
        { categoryId: selectedCategory, limit: quantity },
        { skip: !selectedCategory }
    )
    const listWords = words?.data || []

    // ─── Quiz config ───────────────────────────────────────────────
    const [quizMode, setQuizMode] = React.useState<"word-to-meaning" | "meaning-to-word" | "both">("word-to-meaning")
    const [retryQuiz, setRetryQuiz] = React.useState<QuizItem[]>([])
    const listQuiz = useMemo(() => {
        if (currentScreen !== 3 || selectedMode !== "quiz") return []
        if (retryQuiz.length) return retryQuiz
        if (!listWords.length) return []
        return generateQuiz(listWords, quantity, quizMode)
    }, [listWords, retryQuiz, quantity, quizMode, currentScreen, selectedMode])

    // ─── Result ────────────────────────────────────────────────────
    const [result, setResult] = React.useState<PracticeResult<QuizItem[]> | null>(null)

    // ─── Constants ────────────────────────────────────────────────


    const quizModeOptions = [
        { value: "word-to-meaning", label: "Nhìn từ chọn nghĩa", description: "Hiện từ vựng làm đề bài, bạn chọn nghĩa tương ứng." },
        { value: "meaning-to-word", label: "Nhìn nghĩa chọn từ", description: "Hiện nghĩa làm đề bài, bạn chọn từ vựng tương ứng." },
        { value: "both", label: "Cả hai", description: "Kết hợp cả hai chế độ trên." }
    ]

    // ─── Handlers ─────────────────────────────────────────────────
    const handleChooseMode = (type: string) => {
        setSelectedMode(type as "quiz" | "input" | "flashcard")
        setCurrentScreen(2)
    }

    const handleStartPractice = () => {
        setRetryQuiz([])
        setCurrentScreen(3)
    }

    const handleRetry = (mode: string) => {
        if (mode === "quiz") {
            setRetryQuiz(result?.practiceItemsRetry || [])
            setResult(null)
            setCurrentScreen(3)
        }

        if (mode === "input") {
            // TODO: Handle input mode retry
        }

        if (mode === "flashcard") {
            // TODO: Handle flashcard mode retry
        }
    }

    // ─── Render ───────────────────────────────────────────────────
    return (
        <div>
            {currentScreen === 1 && (
                <Screen1 handleChooseMode={handleChooseMode} />
            )}

            {currentScreen === 2 && (
                <>
                    <div
                        className='cursor-pointer mb-5 items-center gap-1 hover:opacity-70 inline-flex'
                        onClick={() => setCurrentScreen(currentScreen - 1)}
                    >
                        <ArrowLeft size={18} />
                        <span className='text-sm font-semibold'>Quay lại</span>
                    </div>

                    <Card className='md:max-w-xl mx-auto py-10 bg-sidebar'>
                        <CardHeader className='flex items-center justify-center'>
                            <div className="flex items-center gap-2">
                                <Settings size={18} />
                                <CardTitle className='text-xl font-semibold'>Thiết lập bài trắc nghiệm</CardTitle>
                            </div>
                        </CardHeader>

                        <CardContent className='py-10 border-y border-border'>
                            <div className='flex flex-col gap-4 w-fit mx-auto'>
                                <CustomSelect
                                    label='Chọn bộ từ trong thư viện cá nhân của bạn'
                                    placeholder='Chọn thư viện...'
                                    options={categories?.map(cat => ({ value: cat.id, label: cat.name })) || []}
                                    value={selectedCategory || ''}
                                    onChange={setSelectedCategory}
                                />
                                <CustomSelect
                                    label='Số lượng từ ôn tập'
                                    options={[10, 20, 30, 40, 50].map(num => ({ value: num.toString(), label: num.toString() }))}
                                    value={quantity.toString()}
                                    onChange={(value) => setQuantity(parseInt(value))}
                                />
                            </div>

                            {selectedMode === "quiz" && (
                                <div className='mt-10'>
                                    <h2 className='text-sm font-semibold tracking-wide text-muted mb-4'>Chế độ trắc nghiệm</h2>
                                    <RadioGroup defaultValue="word-to-meaning" onValueChange={setQuizMode}>
                                        {quizModeOptions.map((option) => (
                                            <div key={option.value} className="flex items-center gap-3 border border-border hover:shadow duration-300 rounded-lg p-3">
                                                <RadioGroupItem value={option.value} id={option.value} />
                                                <label className='flex flex-col cursor-pointer w-full' htmlFor={option.value}>
                                                    {option.label}
                                                    <span className='text-muted text-xs'>{option.description}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className='bg-muted/10'>
                            <div className='grid grid-cols-10 gap-4 w-full'>
                                <Button
                                    onClick={() => setCurrentScreen(currentScreen - 1)}
                                    variant="outline"
                                    className='col-span-3 flex items-center gap-2 p-6 rounded-lg cursor-pointer hover:border-accent hover:text-accent'
                                >
                                    Hủy bỏ
                                </Button>

                                {listWords.length > 4 ? (
                                    <Button
                                        onClick={handleStartPractice}
                                        className='col-span-7 flex items-center justify-center gap-2 p-6 rounded-lg cursor-pointer hover:-translate-y-0.5 transition-transform'
                                    >
                                        Bắt đầu luyện tập <ArrowRight />
                                    </Button>
                                ) : (
                                    <Button className='col-span-7 flex items-center justify-center gap-2 p-6 rounded-lg bg-red-500/10 animate-pulse'>
                                        <TriangleAlert className='text-destructive animate-bounce' size={20} />
                                        <span className='text-destructive'>Cần có hơn 4 từ để bắt đầu</span>
                                    </Button>
                                )}
                            </div>
                        </CardFooter>
                    </Card>
                </>
            )}

            {currentScreen === 3 && (
                <div>
                    {selectedMode === 'quiz' && (
                        <QuizMode listQuiz={listQuiz} onFinish={(result) => {
                            setResult(result)
                            setCurrentScreen(4)
                        }} />
                    )}
                    {selectedMode === 'flashcard' && <div>Flashcard Mode</div>}
                    {selectedMode === 'input' && <div>Input Mode</div>}
                </div>
            )}

            {currentScreen === 4 && (
                <div className='max-w-5xl mx-auto border shadow-lg px-4 pt-20 py-10 rounded-lg flex flex-col items-center justify-center gap-4'>
                    <div className='p-4 rounded-full border-4 border-accent/80 bg-accent/10 w-fit animate-bounce'>
                        <Trophy size={48} className='text-accent' />
                    </div>

                    <div className='text-center flex flex-col gap-2'>
                        <h2 className='text-2xl font-bold'>Mục này thay đổi dựa trên kết quả của luyện tập</h2>
                        <p>Mục này thay đổi dựa trên kết quả</p>
                    </div>

                    <div className="md:p-5 py-5 px-4 flex items-center justify-around gap-2 border-2 border-accent/10 rounded-lg mt-10 bg-accent/2 md:w-3/4">
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='uppercase font-semibold text-muted text-xs font-sans text-center'>Quy mô từ vựng</p>
                            <span className='font-bold text-xl'>{result?.totalQuestions || 0}</span>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='uppercase font-semibold text-xs font-sans text-green-500 text-center'>Trả lời đúng</p>
                            <span className='font-bold text-xl text-green-500'>{result?.correctCount || 0}</span>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='uppercase font-semibold text-xs font-sans text-red-500 text-center'>Từ chưa nhớ</p>
                            <span className='font-bold text-xl text-red-500'>{result?.wrongCount || 0}</span>
                        </div>
                    </div>

                    <div className="md:p-5 py-5 px-4 border-2 border-red-500/10 bg-sidebar mt-10 md:w-3/4 rounded-lg">
                        <div className='flex items-center gap-2 mb-4'>
                            <TriangleAlert className='text-red-500' size={16} />
                            <p className='font-semibold text-red-500'>Các lỗ hổng kiến thức cần vá ({result?.wrongCount}):</p>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {result?.wrongItems.map((item) => (
                                <div key={item.wordId} className='py-2 px-4 border border-red-500/10 rounded-lg w-fit'>
                                    <span className='text-sm text-red-500 font-bold'>{item.word}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='md:w-3/4 flex flex-col md:flex-row items-end gap-4 justify-end'>
                        {result?.wrongCount && result.wrongCount > 0 && (
                            <Button
                                onClick={() => handleRetry(result.practiceType)}
                                variant="outline"
                                className='py-6 px-4 hover:-translate-y-0.5 transition-transform cursor-pointer'
                            >
                                <RotateCcw />
                                Luyện tập lại câu sai ({result.wrongCount} câu)
                            </Button>
                        )}
                        <Button variant="default" className='py-6 px-4 hover:-translate-y-0.5 transition-transform cursor-pointer'>
                            <SaveIcon />
                            Kết thúc và lưu kết quả
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PracticePage