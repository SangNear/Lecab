"use client"
import React from 'react'
import ChooseModeScreen from './_components/ChooseModeScreen'
import PracticeConfigScreen from './_components/PracticeConfigScreen' // Import component mới ở đây
import QuizMode from './_components/QuizMode'
import ListenMode from './_components/ListenMode'
import WriteMode from './_components/WriteMode'
import FlashCardMode from './_components/FlashCardMode'
import ResultScreen from './_components/ResultScreen'


import { QuizItem, BasePracticeItem } from '@/lib/generatePractice'
import { usePracticeData } from '@/hooks/usePracticeData'

export interface PracticeResult<TType extends AnyResult["practiceType"], TRetry = undefined> {
    totalQuestions: number;
    correctCount: number;
    wrongCount: number;
    wrongItems: { wordId: string; word: string; meaning: string, userChoice: string | null, status: "correct" | "incorrect" }[];
    practiceType: TType;
    completedAt: Date;
    score: number;
    practiceItemsRetry?: TRetry;
}
type QuizResult = PracticeResult<"quiz", QuizItem[]>
type ListenResult = PracticeResult<"listen", BasePracticeItem[]>
type WriteResult = PracticeResult<"write", BasePracticeItem[]>
export type AnyResult = QuizResult | ListenResult | WriteResult
export type RetryItems = QuizItem[] | BasePracticeItem[]

const PracticePage = () => {
    const [currentScreen, setCurrentScreen] = React.useState(1)
    const [selectedMode, setSelectedMode] = React.useState<"quiz" | "listen" | "write" | "flashcard" | null>(null)


    const p = usePracticeData({ selectedMode, currentScreen })
    const handleChooseMode = (type: string) => {
        setSelectedMode(type as typeof selectedMode)
        setCurrentScreen(2)
    }

    const handleStartPractice = () => {
        p.startPractice()
        setCurrentScreen(3)
    }

    const handleRetry = (mode: string) => {
        p.retryPractice(mode)
        setCurrentScreen(3)
    }

    return (
        <div>
            {currentScreen === 1 && (
                <ChooseModeScreen handleChooseMode={handleChooseMode} />
            )}

            {currentScreen === 2 && (
                <PracticeConfigScreen
                    selectedMode={selectedMode}
                    currentScreen={currentScreen}
                    setCurrentScreen={setCurrentScreen}
                    practiceHook={p}
                    onStartPractice={handleStartPractice}
                />
            )}

            {currentScreen === 3 && (
                <div>
                    {selectedMode === 'quiz' && (
                        <QuizMode listQuiz={p.listQuiz} onFinish={(res) => { p.setResult(res); setCurrentScreen(4); }} />
                    )}
                    {selectedMode === 'listen' && (
                        <ListenMode listListen={p.listListen} onFinish={(res) => { p.setResult(res); setCurrentScreen(4); }} />
                    )}
                    {selectedMode === 'write' && (
                        <WriteMode listWrite={p.listWrite} onFinish={(res) => { p.setResult(res); setCurrentScreen(4); }} />
                    )}
                    {selectedMode === 'flashcard' && (
                        <FlashCardMode listFlashCard={p.listFlashCard} />
                    )}
                </div>
            )}

            {currentScreen === 4 && (
                <ResultScreen handleRetry={handleRetry} result={p.result} />
            )}
        </div>
    )
}

export default PracticePage