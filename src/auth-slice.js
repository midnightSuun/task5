import { createSlice } from '@reduxjs/toolkit'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

const initialState = {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, refreshToken, ...user } = action.payload

            state.accessToken = accessToken
            state.refreshToken = refreshToken

            if (user.id != null) {
                state.user = user
            }

            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
        },
        logOut: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.user = null
            localStorage.removeItem(ACCESS_TOKEN_KEY)
            localStorage.removeItem(REFRESH_TOKEN_KEY)
        },
    },
})

export const { setCredentials, logOut } = authSlice.actions
export const selectAccessToken = (state) => state.auth.accessToken
export default authSlice.reducer
