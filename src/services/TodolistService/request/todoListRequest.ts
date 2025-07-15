export type Todo = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export type CreateTodoListRequest = Omit<Todo, "id">
export type UpdateTodoListRequest = Todo
