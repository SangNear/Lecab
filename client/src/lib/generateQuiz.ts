import { WordType } from "@/store/api/wordApi";


function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

type QuizDirection = 'word-to-meaning' | 'meaning-to-word' | 'both';

export interface QuizItem {
    wordId: string,
    questionText: string,
    options: string[],
    answerText: string,
    direction: Exclude<QuizDirection, 'both'>
    status: 'pending' | 'correct' | 'incorrect'
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
        const answerText = actualDirection === 'word-to-meaning' ? word.meaning : word.word;



        const distractors: string[] = []
        let maxAttempts = 0

        while (distractors.length < 3 && maxAttempts < 100) {
            maxAttempts++
            const randomIndex = Math.floor(Math.random() * words.length)
            const distractor = words[randomIndex]
            const candidateText = actualDirection === 'word-to-meaning'
                ? distractor.meaning
                : distractor.word;

            if (!distractors.includes(candidateText) && candidateText !== answerText) {
                distractors.push(candidateText)
            }
        }
        return {
            wordId: word.id,
            questionText,
            answerText,
            direction: actualDirection,
            options: shuffleArray([answerText, ...distractors]),
            status: 'pending' as QuizItem['status']  // 👈 thay vì as const
        }

    })


    return quizzes
}

// export function generateSpelling(words: WordType[], limit: number) {
//     if (words.length < limit) {
//         return { message: 'Phải có ít nhất ' + limit + ' từ để bắt đầu', questions: [] };
//     }


// }
