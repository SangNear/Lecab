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
export const wordApi = createApi({
    reducerPath: "wordApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['words', 'wordsToReview'],
    endpoints: (builder) => ({
        createWord: builder.mutation<WordType, WordPayload>({
            query: (word) => ({
                url: "word/add-word",
                method: "POST",
                body: word,
            }),
            invalidatesTags:['words', 'wordsToReview']
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
        updateWordReview: builder.mutation<WordType, { wordId: string, performance: "again" | "easy" }>({
            query: ({ wordId, performance }) => ({
                url: "word/update-word-review",
                method: "POST",
                body: { wordId, performance },
            }),
            invalidatesTags: ['wordsToReview', 'words']
        })
    })
})
export const { useCreateWordMutation, useGetWordsQuery, useGetWordsToReviewQuery, useUpdateWordReviewMutation } = wordApi;