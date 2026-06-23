"use client"
import React from 'react'
import { ArrowLeft, ArrowRight, Settings, TriangleAlert } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import CustomSelect from '@/components/custom/selectCustom'

interface PracticeConfigScreenProps {
    selectedMode: "quiz" | "listen" | "write" | "flashcard" | null
    currentScreen: number
    setCurrentScreen: React.Dispatch<React.SetStateAction<number>>
    practiceHook: any
    onStartPractice: () => void
}

const PracticeConfigScreen = ({
    selectedMode,
    currentScreen,
    setCurrentScreen,
    practiceHook: p,
    onStartPractice
}: PracticeConfigScreenProps) => {


    const listWords = p.listWords || [];
    const hasWords = listWords.length > 0;

    const quizModeOptions = [
        { value: "word-to-meaning", label: "Nhìn từ chọn nghĩa", description: "Hiện từ vựng làm đề bài, bạn chọn nghĩa tương ứng." },
        { value: "meaning-to-word", label: "Nhìn nghĩa chọn từ", description: "Hiện nghĩa làm đề bài, bạn chọn từ vựng tương ứng." },
        { value: "both", label: "Cả hai", description: "Kết hợp cả hai chế độ trên." }
    ]

    const flashcardModeOptions = [
        { value: "word-to-meaning", label: "Nhìn từ trước", description: "Nhận diện mặt từ suy đoán nghĩa." },
        { value: "meaning-to-word", label: "Nhìn nghĩa trước", description: "Nhận diện mặt nghĩa suy đoán từ." },
    ]

    if (selectedMode === "flashcard") {
        console.log("thông tin card,", hasWords ? listWords : "Không có dữ liệu");
    }

    return (
        <>
            <div
                className='cursor-pointer mb-5 items-center gap-1 hover:opacity-70 inline-flex'
                onClick={() => setCurrentScreen(currentScreen - 1)}
            >
                <ArrowLeft size={18} />
                <span className='text-sm font-semibold'>Quay lại</span>
            </div>

            <Card className='md:max-w-3xl mx-auto py-4 bg-sidebar'>
                <CardHeader className='flex items-center '>
                    <div className="flex items-center gap-2">
                        <div className="p-3 rounded-lg bg-accent text-white">
                            <Settings className="w-6 h-6" />
                        </div>
                        <CardTitle className='text-xl font-semibold'>Thiết lập bài luyện tập</CardTitle>
                    </div>
                </CardHeader>

                <CardContent className='py-10 border-t border-border'>
                    {selectedMode === "flashcard" ? (
                        <div className='space-y-10'>
                            <div>

                                <div className='grid grid-cols-3 gap-4 mt-2'>
                                    <div className="p-3.5 rounded-xl border text-center transition-all bg-red-500/5">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 block font-bold  ">Cần ôn hôm nay</span>
                                        <span className="text-2xl font-black text-rose-500 font-mono">{p.listFlashCard?.length || 0}</span>

                                    </div>

                                    <div className="p-3.5 rounded-xl border text-center transition-all bg-orange-500/5">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 block font-bold  ">Thẻ chưa học</span>
                                        <span className="text-2xl font-black text-accent font-mono">20</span>

                                    </div>

                                    <div className="p-3.5 rounded-xl border border-green-500/10 text-center transition-all bg-green-500/5">
                                        <span className="text-xs text-gray-500 dark:text-gray-400 block font-bold  ">Đã thuộc</span>
                                        <span className="text-2xl font-black text-green-500 font-mono">10442</span>
                                    </div>
                                </div>
                            </div>

                            {/* 💡 Sử dụng biến hasWords rút gọn */}
                            {hasWords && (
                                <>
                                    <div className="space-y-2 mt-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-orange-500 block">Mặt thẻ hiển thị đầu tiên</label>
                                        <RadioGroup className="grid grid-cols-2" defaultValue="word-to-meaning" onValueChange={(val) => p.setFlashcardMode(val as any)}>
                                            {flashcardModeOptions.map((option) => (
                                                <div key={option.value} className="w-full flex items-center gap-3 border border-border hover:shadow duration-300 rounded-lg p-3">
                                                    <RadioGroupItem value={option.value} id={option.value} />
                                                    <label className='flex flex-col cursor-pointer w-full' htmlFor={option.value}>
                                                        {option.label}
                                                        <span className='text-muted text-xs'>{option.description}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>

                                    {/* <div className="space-y-2 mt-4">
                                        <label className="text-xs font-bold uppercase tracking-wider text-orange-500 block">Chất giọng bản xứ phát âm</label>
                                        <div className='flex items-center gap-2'>
                                            <Button
                                                variant={p.selectedVoice === "us" ? "default" : "outline"}
                                                className={p.selectedVoice === "us" ? "bg-primary text-primary-foreground" : ""}
                                                onClick={() => p.setSelectedVoice("us")}
                                            >
                                                Giọng mỹ (us)
                                            </Button>
                                            <Button
                                                variant={p.selectedVoice === "uk" ? "default" : "outline"}
                                                className={p.selectedVoice === "uk" ? "bg-primary text-primary-foreground" : ""}
                                                onClick={() => p.setSelectedVoice("uk")}
                                            >
                                                Giọng Anh (uk)
                                            </Button>
                                        </div>
                                    </div> */}
                                </>
                            )}
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-4'>
                                <label>Chọn bộ từ của bạn</label>
                                <CustomSelect
                                    placeholder='Chọn bộ từ...'
                                    options={p.categories?.map((cat: any) => ({ value: cat.id, label: cat.name })) || []}
                                    value={p.selectedCategory || ''}
                                    onChange={p.setSelectedCategory}
                                />
                            </div>

                            <div className='flex items-center gap-4'>
                                <label>Số lượng từ ôn tập</label>
                                <CustomSelect
                                    options={[10, 20, 30, 40, 50].map(num => ({ value: num.toString(), label: num.toString() }))}
                                    value={p.quantity.toString()}
                                    onChange={(value) => p.setQuantity(parseInt(value))}
                                />
                            </div>

                            {/* 💡 Sử dụng biến listWords rút gọn */}
                            <p className='text-green-400 font-semibold'> {listWords.length} từ sẵn sàng</p>
                        </div>
                    )}

                    {selectedMode === "quiz" && (
                        <div className='mt-10'>
                            <h2 className='text-sm font-semibold tracking-wide text-muted mb-4'>Chế độ trắc nghiệm</h2>
                            <RadioGroup defaultValue="word-to-meaning" onValueChange={(val) => p.setQuizMode(val as any)}>
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

                {/* 💡 Sử dụng biến listWords rút gọn logic check footer */}
                {selectedMode === "flashcard" && listWords.length < 1 ? null : (
                    <CardFooter className='bg-muted/10'>
                        <div className='grid grid-cols-10 gap-4 w-full'>
                            <Button
                                onClick={() => setCurrentScreen(currentScreen - 1)}
                                variant="outline"
                                className='col-span-3 flex items-center gap-2 p-6 rounded-lg cursor-pointer hover:border-accent hover:text-accent'
                            >
                                Hủy bỏ
                            </Button>
                            {selectedMode === "flashcard" ? (
                                <Button
                                    onClick={onStartPractice}
                                    className='col-span-7 flex items-center justify-center gap-2 p-6 rounded-lg cursor-pointer hover:-translate-y-0.5 transition-transform'
                                >
                                    Bắt đầu ôn tập <ArrowRight />
                                </Button>
                            ) : (
                                <>
                                    {/* 💡 Check số lượng từ cực kỳ ngắn gọn */}
                                    {listWords.length > 4 ? (
                                        <Button
                                            onClick={onStartPractice}
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
                                </>
                            )}
                        </div>
                    </CardFooter>
                )}
            </Card>
        </>
    )
}

export default PracticeConfigScreen