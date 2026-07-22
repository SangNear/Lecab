import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { getWordById } from "../../../../server/src/controller/wordController";
import { categoryApi } from "./categoryApi";


interface WordPayloadItem {
    word: string;
    meaning: string;
    pronunciation?: string;
    partsofSpeech?: string;
    example: string[];
    collocations?: string[];
    synonyms?: string[];
}
export interface WordPayload {
    words: WordPayloadItem[];
    categoryId: string;
}
interface WordUpdatePayload {
    wordId: string;
    categoryId: string;
    word?: string;
    meaning?: string;
    example?: string;
    pronunciation?: string | null;
    cefrLevel?: string;
    partOfSpeech?: string;
    addCollocations?: string[];
    removeCollocations?: string[];
    addSynonyms?: string[];
    removeSynonyms?: string[];
}

export interface WordType {
    id: string;
    userId: string;
    word: string;
    categoryId: string;
    status: "UNREVIEWED" | "REMEMBERED" | "FORGOTTEN";
    meaning: string;
    example: string[];
    pronunciation: string | null;
    cefrLevel: string;
    collocations: string[];
    synonyms: string[];
    correctCount: number;
    partsofSpeech: string;
    wrongCount: number;
    isFavorite: boolean;
    level: number;
    lastReviewedAt: string | null;
    nextReviewDate: string;
    nextInterval: number;

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
interface GetWordsParams {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string | null;
}
interface ReviewStats {
    needReview: number;
    unreviewed: number;
    remembered: number;
}
interface GetWordsToReviewResponse {
    success: boolean;
    data: {
        wordsToReview: WordType[];
        stats: ReviewStats;
    };
}

export interface WordLookupResponse {
    id: string;
    word: string;
    definitions: Definition[];
    createdAt: string;
    updatedAt: string;
    status: "READY" | "PENDING" | "FAILED";
}

export interface Definition {
    word: string;
    example: Language[];
    meaning: Language;
    synonyms: Language[];
    wordFamily: WordFamily[];
    collocations: Language[];
    partsofSpeech: PartOfSpeech;
    pronunciation: string;
    register: string
    idioms: Idiom[]
}

export interface Idiom {
    phrase: string
    meaning: Language
    example: Language
}

export interface Language {
    en: string
    vi: string
}

export interface WordFamily {
    en: string;
    vi: string;
    partsofSpeech: PartOfSpeech;
}

export type PartOfSpeech =
    | "noun"
    | "verb"
    | "adjective"
    | "adverb"
    | "pronoun"
    | "preposition"
    | "conjunction"
    | "interjection"
    | "determiner"
    | "article"
    | "auxiliary verb"
    | "modal verb"
    | "phrase";

export const wordApi = createApi({
    reducerPath: "wordApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['words', 'wordsToReview', 'synonyms'],
    endpoints: (builder) => ({
        getWords: builder.query<GetWordsResponse, GetWordsParams>({
            query: ({ page = 1, limit = 20, search, categoryId } = {}) => ({
                url: `word/get-words/${categoryId}`,
                method: "GET",
                params: { page, limit, search: search ?? undefined },

            }),
            providesTags: ['words'],
        }),
        getWordById: builder.query<WordType, { wordId: string; categoryId: string }>({
            query: ({ wordId, categoryId }) => ({
                url: `word/get-word/${encodeURIComponent(wordId)}`,
                method: "GET",
                params: { categoryId }
            }),
            providesTags: (result, error, { wordId }) => [{ type: "words", id: wordId }],
        }),
        updateWord: builder.mutation<WordType, WordUpdatePayload>({
            query: (updateData) => ({
                url: "word/update-word",
                method: "PUT",
                body: updateData,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "words", id: arg.wordId },
            ],
        }),
        createWords: builder.mutation<WordType, WordPayload>({
            query: (word) => ({
                url: "word/add-word",
                method: "POST",
                body: word,
            }),
            invalidatesTags: ['words', 'wordsToReview'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(categoryApi.util.invalidateTags(['categories']));
                } catch {
                    // no-op, để .catch() ở component xử lý toast lỗi
                }
            },
        }),

        getWordsToReview: builder.query<{ words: WordType[]; stats: ReviewStats }, void>({
            query: () => ({
                url: "word/get-words-to-review",
                method: "GET",
            }),
            providesTags: ['wordsToReview'],
            transformResponse: (response: GetWordsToReviewResponse) => {
                return {
                    words: response?.data?.wordsToReview ?? [],
                    stats: response?.data?.stats ?? { needReview: 0, unreviewed: 0, remembered: 0 },
                };
            },
        }),
        updateWordReview: builder.mutation<WordType, { wordId: string, performance: "again" | "easy" | "vague", duration: number }>({
            query: ({ wordId, performance, duration }) => ({
                url: "word/update-word-review",
                method: "POST",
                body: { wordId, performance, duration },
            }),

        }),
        lookupWord: builder.query<WordLookupResponse, { word: string }>({
            query: ({ word }) => ({
                url: `word/dictionary/${encodeURIComponent(word)}`,
                method: "GET",
            }),
        })


    })
})
export const { useLazyLookupWordQuery, useCreateWordsMutation, useGetWordsQuery, useGetWordsToReviewQuery, useUpdateWordReviewMutation, useUpdateWordMutation, useGetWordByIdQuery } = wordApi;