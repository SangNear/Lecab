import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";


interface WordPayload {
    word: string;
    meaning: string;
    example: string[];
}

export interface WordType {
    id: string;
    userId: string;
    word: string;
    meaning: string;
    example: string[];
    pronunciation: string | null;
    cefrLevel: string;
    correctCount: number;
    wrongCount: number;
    isFavorite: boolean;
    level: number;
    lastReviewedAt: string | null;
    nextReviewDate: string;

}

/** Matches `getWordsWithFilter` JSON from the server */
interface GetWordsResponse {
    success: boolean;
    data: WordType[];
    pagination: {
        totalItems: number;
        currentPage: number;
        totalPages: number;
        limit: number;
    };
}
interface SynonymExample {
    word: string;
    level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
    popularity: 1 | 2 | 3 | 4 | 5;
    register: "Formal" | "Informal" | "Slang";
    meaning: string;
    example: [string, string]; // đúng 2 câu ví dụ
}

export interface SynonymGroup {
    sense: string; // context_description_in_english
    synonyms: SynonymExample[];
}

interface SynonymResponse {
    synonyms_groups: SynonymGroup[];
}

/** Body of `GET /word/get-synonyms` */
interface GetSynonymsApiResponse {
    success?: boolean;
    data?: SynonymResponse | null;
}
export const wordApi = createApi({
    reducerPath: "wordApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['words', 'wordsToReview', 'synonyms'],
    endpoints: (builder) => ({
        createWord: builder.mutation<WordType, WordPayload>({
            query: (word) => ({
                url: "word/add-word",
                method: "POST",
                body: word,
            }),
            invalidatesTags: ['words', 'wordsToReview']
        }),
        getWords: builder.query<WordType[], void>({
            query: () => ({
                url: "word/get-words",
                method: "GET",
            }),
            providesTags: ['words'],
            transformResponse: (response: GetWordsResponse | WordType[]) => {
                if (Array.isArray(response)) return response;
                return response?.data ?? [];
            },

        }),
        getWordsToReview: builder.query<WordType[], void>({
            query: () => ({
                url: "word/get-words-to-review",
                method: "GET",
            }),
            providesTags: ['wordsToReview'],
            transformResponse: (response: GetWordsResponse | WordType[]) => {
                if (Array.isArray(response)) return response;
                return response?.data ?? [];
            }
        }),
        updateWordReview: builder.mutation<WordType, { wordId: string, performance: "again" | "easy", duration: number }>({
            query: ({ wordId, performance, duration }) => ({
                url: "word/update-word-review",
                method: "POST",
                body: { wordId, performance, duration },
            }),
            
        }),
        getSynonyms: builder.query<SynonymGroup[], { wordId: string }>({
            query: ({ wordId }) => ({
                url: `word/get-synonyms?wordId=${encodeURIComponent(wordId)}`,
                method: "GET",
            }),
            providesTags: ['synonyms'],
            transformResponse: (response: GetSynonymsApiResponse) => {
                return response?.data?.synonyms_groups ?? [];
            }
        })

    })
})
export const { useCreateWordMutation, useGetWordsQuery, useGetWordsToReviewQuery, useUpdateWordReviewMutation, useGetSynonymsQuery } = wordApi;