import { configureStore } from '@reduxjs/toolkit'
import { todoListApi } from '../services/TodolistService/TodoListService'

export const Store = configureStore({
    reducer: { [todoListApi.reducerPath]: todoListApi.reducer, },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoListApi.middleware),
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch