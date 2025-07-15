import type { Todo } from "../request/todoListRequest"

export type GetAllTodoListByUserIdResponse = Todo[]
export type CreateTodoListResponse = Todo
export type UpdateTodoListResponse = Todo
export type DeleteTodoListResponse = unknown