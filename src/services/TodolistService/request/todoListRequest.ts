import type { TodoType } from "../../../utils/types/todoType"


export type CreateTodoListRequest = Omit<TodoType, "id">
export type UpdateTodoListRequest = TodoType
