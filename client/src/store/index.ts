import { wordApi } from "@/services/word";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [wordApi.reducerPath]: wordApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wordApi.middleware)

})