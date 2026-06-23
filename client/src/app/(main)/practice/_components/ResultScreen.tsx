import { Button } from "@/components/ui/button"
import { Check, RotateCcw, SaveIcon, TriangleAlert, Trophy, X } from "lucide-react"
import { AnyResult } from "../page"


interface ResultScreenProps {
    result: AnyResult | null
    handleRetry: (practiceType: AnyResult["practiceType"]) => void
}

const ResultScreen = ({ result, handleRetry }: ResultScreenProps) => {
    return (
        <div className='max-w-5xl   mx-auto  shadow-lg md:px-4 pt-10 md:pt-20 py-10 rounded-lg flex flex-col items-center justify-center gap-4'>
            <div className='p-4 rounded-full border-4 border-accent/80 bg-accent/10 w-fit animate-bounce'>
                <Trophy size={48} className='text-accent' />
            </div>



            <div className="md:p-5 bg-sidebar py-5 px-4 flex items-center justify-around gap-2 border-2 border-accent/10 rounded-lg mt-10   md:w-3/4">
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className=' font-semibold text-muted text-sm font-sans text-center'>Chính xác</p>
                    <span className='font-bold text-xl text-accent'>{result?.score || 0}%</span>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className=' font-semibold text-sm font-sans text-green-500 text-center'>Trả lời đúng</p>
                    <span className='font-bold text-xl text-green-500'>{result?.correctCount}/{result?.totalQuestions}</span>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className=' font-semibold text-sm font-sans text-red-500 text-center'>Từ chưa nhớ</p>
                    <span className='font-bold text-xl text-red-500'>{result?.wrongCount}/{result?.totalQuestions}</span>
                </div>
            </div>
            <div className='md:w-3/4 flex flex-col md:flex-row items-end gap-4 justify-center'>
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
            <div className="mt-10 md:w-3/4">
                <div className='flex items-center gap-2 mb-4'>
                    <TriangleAlert className='text-red-500' size={16} />
                    <p className='font-semibold'>Các lỗ hổng kiến thức cần vá ({result?.wrongCount}):</p>
                </div>
                {result?.wrongItems.map((item) => (
                    <div key={item.wordId} className={`w-full ${item.status === "incorrect" ? 'bg-red-500/5' : 'bg-green-500/5'} rounded-lg p-4 flex items-center justify-between mb-4`}>

                        <div className='flex flex-col gap-1 '>
                            <span className='font-semibold '>{item.word}</span>
                            <p className='text-xs italic text-muted-foreground'>{item.meaning}</p>
                            <p className='text-sm text-muted-foreground'>Bạn trả lời: <span className={`${item.status === 'incorrect' ? 'text-red-500 line-through' : 'text-green-500'}`}>{item.userChoice}</span></p>
                        </div>
                        <div className={`p-1 rounded ${item.status === 'incorrect' ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                            {item.status === 'incorrect' ? <X className='text-red-500' size={16} /> : <Check className='text-green-500' size={16} />}
                        </div>
                    </div>
                ))}

            </div>


        </div>
    )
}

export default ResultScreen