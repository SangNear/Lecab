import { wordApi } from "@/services/word";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import { authApi } from "./api/authApi";
export const store = configureStore({
    reducer: {
        [wordApi.reducerPath]: wordApi.reducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(wordApi.middleware)

})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
