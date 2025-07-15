import CreateTodoForm from "./CreateTodoForm";
import {
  useCreateTodoListMutation,
  useGetAllTodoListQuery,
} from "../services/TodolistService/TodoListService";
import { Spin } from "antd";
import type { Dispatch, SetStateAction } from "react";
import Todo from "./Todo";

export const USER_ID = 1;

const TodoList = () => {
  const {
    data: todoList,
    isLoading: isTodoListLoading,
    isFetching: isTodoListFetching,
  } = useGetAllTodoListQuery(USER_ID);
  const [createTodo, { isLoading: isCreateLoading }] =
    useCreateTodoListMutation();

  const fnCreateTodo = async (
    todo: string,
    setTodo: Dispatch<SetStateAction<string>>
  ) => {
    const todoTrimmed = todo.trim();
    if (!todoTrimmed) return;
    const { error } = await createTodo({
      userId: USER_ID,
      title: todoTrimmed,
      completed: false,
    });
    if (!error) setTodo("");
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col gap-3 py-4 px-1 w-[40%] h-screen overflow-hidden">
        <div className="w-full text-center text-3xl">TO-DO LIST</div>

        <CreateTodoForm onCreate={fnCreateTodo} isLoading={isCreateLoading} />

        <div className="flex flex-col overflow-auto size-full pb-3">
          {isTodoListLoading || isTodoListFetching ? (
            <div className="flex justify-center items-center size-full">
              <Spin tip="Loading" size="large" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {todoList?.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
