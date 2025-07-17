import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CreateTodoListRequest, CreateTodoListResponse, DeleteTodoListResponse, GetAllTodoListByUserIdResponse, UpdateTodoListRequest, UpdateTodoListResponse } from './types/todoListService.type';


export const todoListApi = createApi({
    reducerPath: 'todoListApi',
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

            onQueryStarted: async (req, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    todoListApi.util.updateQueryData("getAllTodoList", req.userId, (draft) => {
                        const index = draft.findIndex((todo) => todo.id === req.id);
                        if (index !== -1) {
                            draft[index] = { ...draft[index], ...req }
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo()
                }
            }
        }),
        deleteTodoList: builder.mutation<DeleteTodoListResponse, number>({
            query: (id) => ({ url: `/todos/${id}`, method: "DELETE" }),
            invalidatesTags: ["todoList"]
        }),
    }),
})

export const { useCreateTodoListMutation, useDeleteTodoListMutation, useGetAllTodoListQuery, useUpdateTodoListMutation } = todoListApi