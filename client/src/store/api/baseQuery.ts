import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RootState } from "..";
import { Mutex } from "async-mutex";
import { clearCredentials, setCredentials, User } from "../slices/authSlices";
import { apiRoot } from "@/config/api";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: apiRoot,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery({
                    url: "auth/refresh-token",
                    method: "POST",
                }, api, extraOptions)
                
                if (refreshResult.data) {
                    const data = refreshResult.data as { accessToken: string }
                    api.dispatch(setCredentials({
                        accessToken: data.accessToken,
                        user: (api.getState() as RootState).auth.user as User
                    }))
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(clearCredentials())
                    window.location.href = '/login'
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
};