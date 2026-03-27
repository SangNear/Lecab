
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import wordUIReducer from "./slices/wordSlices";
import { authApi } from "./api/authApi";
import { wordApi } from "./api/wordApi";
export const store = configureStore({
    reducer: {
        [wordApi.reducerPath]: wordApi.reducer,
        wordUI: wordUIReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(wordApi.middleware)

})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
