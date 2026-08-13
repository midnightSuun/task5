import { api } from './api'
import { setCredentials } from './auth-slice'

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: 'auth/login',
                method: 'POST',
                body: { username, password, expiresInMins: 30 },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setCredentials(data))
                } catch {
                    // login error is handled in the sign-in form
                }
            },
        }),
        getAuthUser: builder.query({
            query: () => 'auth/me',
        }),
    }),
})

export const { useLoginMutation, useGetAuthUserQuery } = authApi
