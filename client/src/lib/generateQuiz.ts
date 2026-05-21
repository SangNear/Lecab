import { WordType } from "@/store/api/wordApi";


function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function generateQuiz(words: WordType[], limit?: number) {
    if (words.length < 4) {
        throw new Error("Cần ít nhất 4 từ để tạo quiz");
    }

    const selectedWords = limit ? shuffleArray(words).slice(0, limit) : words;

    return shuffleArray(selectedWords).map(currentWord => {
        const distractors = shuffleArray(
            words.filter(w => w.id !== currentWord.id && w.meaning !== currentWord.meaning)
        )
            .slice(0, 3)
            .map(w => w.meaning);

        return {
            wordId: currentWord.id,
            question: currentWord.word,
            options: shuffleArray([currentWord.meaning, ...distractors]),
            answer: currentWord.meaning,
        };
    });
}