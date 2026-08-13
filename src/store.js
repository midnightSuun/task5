import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import './auth-api'
import './recipes-api'
import authReducer from './auth-slice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})
