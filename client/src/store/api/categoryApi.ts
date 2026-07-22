import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import { wordApi } from "./wordApi";


interface CategoryResponse {
    message: string;
    data: CategoryType[];
}
export interface CategoryType {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    wordCount: number;
    iconSlug: string;
}

interface AddCategoryPayload {
    name: string;
    description: string;
    iconSlug?: string;
}

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["categories"],
    endpoints: (builder) => ({
        getAllCategories: builder.query<CategoryType[], void>({
            query: () => ({
                url: "category/get"
            }),
            keepUnusedDataFor: 60,
            transformResponse: (response: CategoryResponse) => {
                return response.data ?? [];
            },
            providesTags: ["categories"]
        }),
        getCategoriesWithoutWord: builder.query<CategoryType[], { word: string }>({
            query: ({ word }) => ({
                url: "category/get-without-word",
                params: { word }
            }),
            keepUnusedDataFor: 60,
            transformResponse: (response: CategoryResponse) => {
                return response.data ?? [];
            },
            providesTags: ["categories"]
        }),
        addCategory: builder.mutation<CategoryType, AddCategoryPayload>({
            query: (payload) => ({
                url: "category/add",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["categories"]
        }),
        deleteCategory: builder.mutation<void, { categoryId: string }>({
            query: ({ categoryId }) => ({
                url: `category/delete`,
                method: "POST",
                body: { categoryId },
            }),
            invalidatesTags: ["categories"],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    dispatch(wordApi.util.invalidateTags(["words", "wordsToReview"]));
                } catch (error) {
                    console.error('Error deleting category:', error);
                }
            }
        }),
        updateCategory: builder.mutation<CategoryType, { categoryId: string, name: string, description: string }>({
            query: ({ categoryId, name, description }) => ({
                url: `category/update`,
                method: "PUT",
                body: { categoryId, name, description },
            }),
            invalidatesTags: ["categories"]
        })
    })

})

export const { useGetAllCategoriesQuery, useGetCategoriesWithoutWordQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } = categoryApi;