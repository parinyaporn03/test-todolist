import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CreateTodoListResponse, DeleteTodoListResponse, GetAllTodoListByUserIdResponse, UpdateTodoListResponse } from './response/todoListResponse'
import type { CreateTodoListRequest, UpdateTodoListRequest } from './request/todoListRequest'

export const todoListApi = createApi({
    reducerPath: 'todoListApi',
    // manage caching
    tagTypes: ["todoList"],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getAllTodoList: builder.query<GetAllTodoListByUserIdResponse, number>({
            providesTags: ["todoList"],
            query: (id) => ({ url: `/todos`, params: { userId: id } })
        }),
        createTodoList: builder.mutation<CreateTodoListResponse, CreateTodoListRequest>({
            query: (req) => ({ url: "/todos", method: "POST", body: req }),
            invalidatesTags: ["todoList"]
        }),
        updateTodoList: builder.mutation<UpdateTodoListResponse, UpdateTodoListRequest>({
            query: (req) => ({ url: `/todos/${req.id}`, method: "PUT", body: req }),
            invalidatesTags: (_result, _error, req) => {
                return [{ type: "todoList", id: req.id }]
            },
        }),
        deleteTodoList: builder.mutation<DeleteTodoListResponse, number>({
            query: (id) => ({ url: `/todos/${id}`, method: "DELETE" }),
            invalidatesTags: ["todoList"]
        }),
    }),
})

export const { useCreateTodoListMutation, useDeleteTodoListMutation, useGetAllTodoListQuery, useUpdateTodoListMutation } = todoListApi