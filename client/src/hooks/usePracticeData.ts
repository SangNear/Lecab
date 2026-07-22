import React, { useMemo } from 'react'
import { useGetAllCategoriesQuery } from '@/store/api/categoryApi'
import { useGetWordsQuery, useGetWordsToReviewQuery } from '@/store/api/wordApi'
import {
    generateQuiz,
    generateInputQuestion,
    generateFlashCard,
    QuizItem,
    BasePracticeItem
} from '@/lib/generatePractice'
import { AnyResult, RetryItems } from '@/app/(main)/practice/page'

interface UsePracticeDataProps {
    selectedMode: "quiz" | "listen" | "write" | "flashcard" | null
    currentScreen: number
}

export const usePracticeData = ({ selectedMode, currentScreen }: UsePracticeDataProps) => {

    const [selectedVoice, setSelectedVoice] = React.useState<"us" | "uk">("us")


    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
    const [quantity, setQuantity] = React.useState(10)
    const [retryItems, setRetryItems] = React.useState<RetryItems>([])
    const [result, setResult] = React.useState<AnyResult | null>(null)


    const [quizMode, setQuizMode] = React.useState<"word-to-meaning" | "meaning-to-word" | "both">("word-to-meaning")
    const [flashcardMode, setFlashcardMode] = React.useState<"word-to-meaning" | "meaning-to-word">("word-to-meaning")


    const { data: categories } = useGetAllCategoriesQuery()

    const { data: wordFlashCards } = useGetWordsToReviewQuery(undefined, {
        refetchOnMountOrArgChange: true,
        skip: selectedMode !== "flashcard"
    })

    const { data: words } = useGetWordsQuery(
        { categoryId: selectedCategory },
        { skip: !selectedCategory || selectedMode === "flashcard" }
    )

    const statFlashCard = wordFlashCards?.stats

    const listWords = selectedMode === "flashcard" ? wordFlashCards?.words : words?.data || []

    const listQuiz = useMemo(() => {
        if (currentScreen !== 3 || selectedMode !== "quiz") return []
        if (retryItems.length) return retryItems as QuizItem[]
        if (!listWords || !listWords.length) return []
        return generateQuiz(listWords, quantity, quizMode)
    }, [listWords, retryItems, quantity, quizMode, currentScreen, selectedMode])

    const listListen = useMemo(() => {
        if (currentScreen !== 3 || selectedMode !== "listen") return []
        if (retryItems.length) return retryItems as BasePracticeItem[]
        if (!listWords || !listWords.length) return []
        return generateInputQuestion(listWords, quantity, "listen")
    }, [listWords, retryItems, currentScreen, selectedMode])

    const listWrite = useMemo(() => {
        if (currentScreen !== 3 || selectedMode !== "write") return []
        if (retryItems.length) return retryItems as BasePracticeItem[]
        if (!listWords || !listWords.length) return []
        return generateInputQuestion(listWords, quantity, "write")
    }, [listWords, retryItems, currentScreen, selectedMode])

    const listFlashCard = useMemo(() => {
        if (selectedMode !== "flashcard") return []
        if (!listWords || !listWords.length) return []
        return generateFlashCard(listWords, flashcardMode)
    }, [listWords, flashcardMode, selectedMode])

    // ─── Handlers ─────────────────────────────────────────────────
    const startPractice = () => {
        setRetryItems([])
    }

    const retryPractice = (mode: string) => {
        if (mode === "flashcard") {
            return
        }
        setRetryItems(result?.practiceItemsRetry || [])
        setResult(null)
    }
    return {
        categories,
        listWords,
        listQuiz,
        listListen,
        listWrite,
        listFlashCard,
        statFlashCard,
        quantity,
        setQuantity,
        selectedCategory,
        setSelectedCategory,
        selectedVoice,
        setSelectedVoice,
        quizMode,
        setQuizMode,
        flashcardMode,
        setFlashcardMode,
        result,
        setResult,
        startPractice,
        retryPractice
    }
}