import CreateTodoForm from "../components/CreateTodoForm";
import { useGetAllTodoListQuery } from "../services/TodolistService/TodoListService";
import { Spin } from "antd";
import Todo from "../components/Todo";

export const USERID = 1;

const TodoList = () => {
  const {
    data: todoList,
    isLoading: isTodoListLoading,
    isFetching: isTodoListFetching,
  } = useGetAllTodoListQuery(USERID);

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col gap-3 py-4 px-1 w-[40%] h-screen overflow-hidden">
        <div className="w-full text-center text-3xl">TO-DO LIST</div>

        <CreateTodoForm />

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
