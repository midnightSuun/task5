import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from './auth-slice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
})

const getRequestUrl = (args) => (typeof args === 'string' ? args : args.url)

let refreshPromise = null

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    const requestUrl = getRequestUrl(args)
    const shouldSkipReauth =
        requestUrl === 'auth/refresh' || requestUrl === 'auth/login'

    if (result.error?.status !== 401 || shouldSkipReauth) {
        return result
    }

    const refreshToken = api.getState().auth.refreshToken

    if (!refreshToken) {
        api.dispatch(logOut())
        return result
    }

    if (!refreshPromise) {
        refreshPromise = baseQuery(
            {
                url: 'auth/refresh',
                method: 'POST',
                body: { refreshToken, expiresInMins: 30 },
            },
            api,
            extraOptions
        ).finally(() => {
            refreshPromise = null
        })
    }

    const refreshResult = await refreshPromise

    if (!refreshResult.data) {
        api.dispatch(logOut())
        return result
    }

    api.dispatch(setCredentials(refreshResult.data))
    result = await baseQuery(args, api, extraOptions)

    return result
}
