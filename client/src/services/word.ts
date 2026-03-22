import { createApi } from "@reduxjs/toolkit/query/react";
import { word, WordType } from "@/db/db";
export const wordApi = createApi({
    reducerPath: "wordApi",
    baseQuery: async () => ({ data: null }),
    endpoints: (builder) => ({
        getWords: builder.query<WordType[], void>({
            async queryFn() {
                await new Promise((res) => setTimeout(res, 1000))
                return { data: word }
            }
        })
    })
})

export const { useGetWordsQuery } = wordApi;