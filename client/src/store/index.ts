
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import wordUIReducer from "./slices/wordSlices";
import { authApi } from "./api/authApi";
import { wordApi } from "./api/wordApi";
import { categoryApi } from "./api/categoryApi";
export const store = configureStore({
    reducer: {
        [wordApi.reducerPath]: wordApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        wordUI: wordUIReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(wordApi.middleware)
            .concat(categoryApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
