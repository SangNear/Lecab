import { WordType } from "@/store/api/wordApi";


export function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

type QuizDirection = 'word-to-meaning' | 'meaning-to-word' | 'both';

export interface FlashCardItem {
    wordId: string
    word: string
    meaning: string
    example: string
    pronunciation: string | null
    partOfSpeech: string
}

export interface BasePracticeItem {
    wordId: string,
    questionText: string | null,
    correctAnswer?: string,
    status: 'pending' | 'correct' | 'incorrect'
    userChoice: string | null
}

export interface QuizItem extends BasePracticeItem {

    options: string[],
    direction: Exclude<QuizDirection, 'both'>

}



export function generateQuiz(words: WordType[], limit: number, direction: QuizDirection = 'word-to-meaning') {
    if (words.length < 4) {
        return []
    }

    const questionPool = shuffleArray(words)

    let quizzes = questionPool.slice(0, limit).map(word => {
        let actualDirection: Exclude<QuizDirection, 'both'>;
        if (direction === 'both') {
            actualDirection = Math.random() < 0.5 ? 'word-to-meaning' : 'meaning-to-word'
        } else {
            actualDirection = direction
        }
        const questionText = actualDirection === 'word-to-meaning' ? word.word : word.meaning;
        const correctAnswer = actualDirection === 'word-to-meaning' ? word.meaning : word.word;



        const distractors: string[] = []
        let maxAttempts = 0

        while (distractors.length < 3 && maxAttempts < 100) {
            maxAttempts++
            const randomIndex = Math.floor(Math.random() * words.length)
            const distractor = words[randomIndex]
            const candidateText = actualDirection === 'word-to-meaning'
                ? distractor.meaning
                : distractor.word;

            if (!distractors.includes(candidateText) && candidateText !== correctAnswer) {
                distractors.push(candidateText)
            }
        }
        return {
            wordId: word.id,
            questionText,
            correctAnswer,
            direction: actualDirection,
            options: shuffleArray([correctAnswer, ...distractors]),
            status: 'pending' as QuizItem['status'],
            userChoice: null
        }

    })


    return quizzes
}

export function generateInputQuestion(words: WordType[], limit: number, mode: 'listen' | 'write'): BasePracticeItem[] {
    if (words.length < 4) {
        return []
    }

    const questionPool = shuffleArray(words)

    const question = questionPool.slice(0, limit).map(word => {
        return {
            wordId: word.id,
            correctAnswer: word.word,
            status: 'pending' as BasePracticeItem['status'],
            questionText: mode === 'write' ? word.meaning : null,
            userChoice: null
        }
    })

    return question
}



export function generateFlashCard(words: WordType[], mode: 'word-to-meaning' | 'meaning-to-word'): FlashCardItem[] {
    const flashCards = words.map(word => {
        return {
            wordId: word.id.toString(),
            word: mode === 'word-to-meaning' ? word.word : word.meaning,
            meaning: mode === 'word-to-meaning' ? word.meaning : word.word,
            pronunciation: word.pronunciation,
            example: word.example?.[0] || '',
            partOfSpeech: word.partsofSpeech || ''
        }
    })
    return flashCards
}



