"use client"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, LogOut, Volume2 } from "lucide-react";
import { useState } from "react";
import { PracticeResult } from "../page";
import { QuizItem } from "@/lib/generatePractice";
import { playFeedbackSound } from "@/lib/audio";

interface QuizModeProps {
    listQuiz: QuizItem[]
    onFinish: (result: PracticeResult<"quiz", QuizItem[]>) => void
}

const QuizMode = ({ listQuiz, onFinish }: QuizModeProps) => {
    const [quizState, setQuizState] = useState<QuizItem[]>(() => listQuiz.map((item) => ({ ...item, status: "pending" })));
    const [isChoose, setIsChoose] = useState(false);
    const [choose, setChoose] = useState<string | null>(null);
    const [currentQuiz, setCurrentQuiz] = useState(0);

    const handleNextQuestion = () => {
        if (currentQuiz >= quizState.length - 1) {
            const totalQuestions = quizState.length;
            const correctCount = quizState.filter(item => item.status === "correct").length;
            const wrongCount = quizState.filter(item => item.status === "incorrect").length;
            const wrongItems = quizState.map((q) => ({
                wordId: q.wordId,
                word: q.direction === "word-to-meaning" ? q.questionText : q.correctAnswer,
                meaning: q.direction === "word-to-meaning" ? q.correctAnswer : q.questionText,
                userChoice: q.userChoice,
                status: q.status
            }))
            onFinish({
                totalQuestions,
                correctCount,
                wrongCount,
                wrongItems: wrongItems as { wordId: string; word: string; meaning: string, userChoice: string | null, status: "correct" | "incorrect" }[],
                practiceItemsRetry: quizState.filter(item => item.status === "incorrect"),
                practiceType: "quiz",
                completedAt: new Date(),
                score: Math.round(correctCount / totalQuestions * 100 * 100) / 100
            });

            return;
        }
        if (currentQuiz < quizState.length - 1) {
            setCurrentQuiz(currentQuiz + 1);
            setIsChoose(false);
            setChoose(null);
        }

    }


    const handleChooseAnswer = (option: string) => {
        if (isChoose) return; // chặn chọn lại sau khi đã chọn

        setIsChoose(true);
        setChoose(option);

        const isCorrect = option === quizState[currentQuiz]?.correctAnswer;
        playFeedbackSound(isCorrect);

        setQuizState((prev) => {
            return prev.map((quiz, i) => {
                if (i === currentQuiz) {
                    return { ...quiz, status: isCorrect ? "correct" : "incorrect", userChoice: option }
                }
                return quiz
            })
        })
    }

    const getOptionClass = (option: string) => {
        const base = "col-span-12 md:col-span-6 p-4 rounded-lg border-2 transition-all duration-300 font-semibold";

        if (!isChoose) {
            // chưa chọn: hover bình thường
            return `${base} border-border hover:-translate-y-2 hover:bg-accent/20 hover:border-accent cursor-pointer`;
        }

        const correctAnswer = quizState[currentQuiz]?.correctAnswer;

        if (option === correctAnswer) {
            // luôn highlight đáp án đúng
            return `${base} border-green-500 bg-green-500/20 text-green-600 cursor-default`;
        }

        if (option === choose) {
            // đáp án user chọn mà sai
            return `${base} border-red-500 bg-red-500/20 text-red-600 cursor-default`;
        }

        // các option còn lại mờ đi
        return `${base} border-border opacity-40 cursor-default`;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="w-full rounded-lg shadow-xl/10 p-4 bg-sidebar">
                <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">
                        Câu hỏi {currentQuiz + 1}/{quizState.length}
                    </p>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 p-2 font-semibold cursor-pointer hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 text-red-500"
                    >
                        <LogOut />
                        <span>Thoát</span>
                    </Button>
                </div>
                <Progress value={((currentQuiz + 1) / quizState.length) * 100} className="w-full py-4" />
            </div>

            <div className="w-full shadow-xl/10 rounded-lg mt-4 p-6 bg-sidebar">
                <div className="flex flex-col gap-2 items-center mt-10">
                    <div className="p-2 rounded-full bg-accent/50 hover:bg-accent/70 cursor-pointer">
                        <Volume2 size={16} className="text-white" />
                    </div>
                    <p className="font-bold text-3xl">{quizState[currentQuiz]?.questionText}</p>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-10">
                    {quizState[currentQuiz]?.options.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => handleChooseAnswer(option)}
                            className={getOptionClass(option)}
                        >
                            {String.fromCharCode(65 + index)}. {option}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={handleNextQuestion}
                    disabled={!isChoose} // chỉ cho next khi đã chọn
                    className="mt-4 rounded-lg cursor-pointer hover:-translate-y-1 text-right p-6 disabled:opacity-50"
                >
                    Câu tiếp theo <ArrowRight />
                </Button>
            </div>
        </div>
    )
}

export default QuizMode