import { Checkbox, ConfigProvider, Input, Popconfirm, message } from "antd";

import { useState } from "react";
import {
  useDeleteTodoListMutation,
  useUpdateTodoListMutation,
} from "../services/TodolistService/TodoListService";
import { USERID } from "../pages/TodoList";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { MdCheck, MdClose } from "react-icons/md";
import ButtonAction from "./ButtonAction";
import type { TodoType } from "../services/TodolistService/types/todoListService.type";

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  const [updateTodo, { isLoading: isUpdateLoading }] =
    useUpdateTodoListMutation();
  const [deleteTodo] = useDeleteTodoListMutation();

  const [isEdit, setIsEdit] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(todo.title);

  const handleUpdate = async (todo: TodoType) => {
    try {
      await updateTodo({ ...todo, userId: USERID });
      setIsEdit(false);
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    setUpdateTitle(todo.title);
  };

  const fnOnDeleteConfirm = async (id: number) => {
    try {
      await deleteTodo(id);
      message.success("Delete sucess");
    } catch (error) {
      console.log("Delete error:", error);
      message.error("Delete error");
    }
  };

  return (
    <div className="flex items-center max-sm:flex-col  gap-2 border-1 rounded-md p-1.5 ">
      <div className="flex flex-1 gap-2 items-center">
        {isEdit ? (
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  hoverBorderColor: "#239b56",
                  activeBorderColor: "#239b56",
                },
              },
            }}
          >
            <Input
              className="flex-1"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              disabled={isUpdateLoading}
            />
          </ConfigProvider>
        ) : (
          <Checkbox
            checked={todo.completed}
            onChange={(e) =>
              handleUpdate({ ...todo, completed: e.target.checked })
            }
          >
            <div
              className={`${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </div>
          </Checkbox>
        )}
      </div>
      <div className="flex gap-2">
        {isEdit ? (
          <>
            {/* save btn */}
            <ButtonAction
              // key="saveBtn"
              color="#239b56"
              className="!text-xl"
              onClick={() => handleUpdate({ ...todo, title: updateTitle })}
              loading={isUpdateLoading}
              disabled={
                isUpdateLoading ||
                !updateTitle.trim() ||
                updateTitle.trim() === todo.title
              }
              icon={<MdCheck />}
            />
            {/* cancel btn */}
            <ButtonAction
              // key="cancelBtn"
              color="#e74c3c"
              className="!text-xl"
              onClick={handleCancel}
              disabled={isUpdateLoading}
              icon={<MdClose />}
            />
          </>
        ) : (
          <>
            {/* edit btn */}
            <ButtonAction
              // key="editBtn"
              color="#f1c40f"
              onClick={() => setIsEdit(true)}
              icon={<FaPen />}
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => fnOnDeleteConfirm(todo.id)}
              okText="Yes"
              cancelText="No"
            >
              {/* delete btn */}
              <ButtonAction
                key="deleteBtn"
                color="#e74c3c"
                icon={<FaRegTrashAlt />}
              />
            </Popconfirm>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
