export type TodoType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export type GetAllTodoListByUserIdResponse = TodoType[]
export type CreateTodoListResponse = TodoType
export type UpdateTodoListResponse = TodoType
export type DeleteTodoListResponse = object
export type CreateTodoListRequest = Omit<TodoType, "id">
export type UpdateTodoListRequest = TodoType
