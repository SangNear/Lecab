import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
interface AuthRequest {
    email: string;
    password: string;
    name?: string;
}

interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        name: string | null;
        email: string;
    };
}
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({

        login: builder.mutation<AuthResponse, AuthRequest>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation<AuthResponse, AuthRequest>({
            query: (credentials) => ({
                url: "auth/register",
                method: "POST",
                body: credentials,
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            })
        })
    })
})
export const { useLoginMutation, useLogoutMutation } = authApi;