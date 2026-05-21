"use client";

import { Provider } from "react-redux";
import { store } from "@/store/index";
import { useEffect, useState } from "react";
import { setCredentials } from "@/store/slices/authSlices";
import { apiRoot } from "@/config/api";
import { ThemeProvider } from "@/components/theme-provider";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const restoreAuth = async () => {
            try {
                const refreshToken = await fetch(`${apiRoot}/auth/refresh-token`, {
                    method: "POST",
                    credentials: "include",
                })
                if (!refreshToken.ok) return
                const { accessToken } = await refreshToken.json()

                const me = await fetch(`${apiRoot}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    credentials: "include",
                })

                if (!me.ok) return

                const { user } = await me.json()

                store.dispatch(setCredentials({
                    accessToken: accessToken,
                    user: user,
                }))
            } catch (error) {

            } finally {
                setIsLoading(false)
            }
        }
        restoreAuth()
    }, [])


    return (
        <>{children}</>
    )
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <AuthInitializer>{children}</AuthInitializer>
            </ThemeProvider>
        </Provider>
    )
}