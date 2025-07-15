import {
  Button,
  Checkbox,
  ConfigProvider,
  Input,
  Popconfirm,
  message,
} from "antd";

import { useState } from "react";
import type { Todo as TodoType } from "../services/TodolistService/request/todoListRequest";
import {
  useDeleteTodoListMutation,
  useUpdateTodoListMutation,
} from "../services/TodolistService/TodoListService";
import { USER_ID } from "./TodoList";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { MdCheck, MdClose } from "react-icons/md";

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  const [updateTodo, { isLoading: isUpdateLoading }] =
    useUpdateTodoListMutation();
  const [deleteTodo] = useDeleteTodoListMutation();

  const [isEdit, setIsEdit] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(todo.title);
  const updateTitleTrimmed = updateTitle.trim();

  const fnHandleUpdate = async (todo: TodoType) => {
    if (!updateTitleTrimmed) return;
    const { error } = await updateTodo({ ...todo, userId: USER_ID });
    if (!error) setIsEdit(false);
  };

  const fnHandleCancel = () => {
    setIsEdit(false);
    setUpdateTitle(todo.title);
  };

  const fnOnDeleteConfirm = async (id: number) => {
    const { error } = await deleteTodo(id);
    if (error) return message.error("Delete error");
    message.success("Delete sucess");
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
              fnHandleUpdate({ ...todo, completed: e.target.checked })
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
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultActiveColor: "#239b56",
                    defaultActiveBorderColor: "#239b56 ",
                    defaultHoverBorderColor: "#239b56 ",
                    defaultHoverColor: "#239b56 ",
                  },
                },
              }}
            >
              <Button
                key="saveBtn"
                className="!text-xl"
                onClick={() => fnHandleUpdate({ ...todo, title: updateTitle })}
                loading={isUpdateLoading}
                disabled={
                  isUpdateLoading ||
                  !updateTitleTrimmed ||
                  updateTitleTrimmed === todo.title
                }
                icon={<MdCheck />}
              />
            </ConfigProvider>

            {/* cancel btn */}
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultActiveColor: "#e74c3c",
                    defaultActiveBorderColor: "#e74c3c ",
                    defaultHoverBorderColor: "#e74c3c ",
                    defaultHoverColor: "#e74c3c ",
                  },
                },
              }}
            >
              <Button
                key="cancelBtn"
                className="!text-xl"
                onClick={fnHandleCancel}
                disabled={isUpdateLoading}
                icon={<MdClose />}
              />
            </ConfigProvider>
          </>
        ) : (
          <>
            {/* edit btn */}
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultActiveColor: "#f1c40f",
                    defaultActiveBorderColor: "#f1c40f ",
                    defaultHoverBorderColor: "#f1c40f",
                    defaultHoverColor: "#f1c40f",
                  },
                },
              }}
            >
              <Button
                key="editBtn"
                onClick={() => setIsEdit(true)}
                icon={<FaPen />}
              />
            </ConfigProvider>

            {/* delete btn */}
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultActiveColor: "#e74c3c",
                    defaultActiveBorderColor: "#e74c3c ",
                    defaultHoverBorderColor: "#e74c3c ",
                    defaultHoverColor: "#e74c3c ",
                  },
                },
              }}
            >
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => fnOnDeleteConfirm(todo.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button key="deleteBtn" icon={<FaRegTrashAlt />} />
              </Popconfirm>
            </ConfigProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
