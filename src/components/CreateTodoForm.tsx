import { Button, ConfigProvider, Input } from "antd";
import { useState } from "react";
import { useCreateTodoListMutation } from "../services/TodolistService/TodoListService";
import { USERID } from "../pages/TodoList";

const CreateTodoForm = () => {
  const [todoName, setTodoName] = useState("");
  const [createTodo, { isLoading }] = useCreateTodoListMutation();

  const handleCreateTodo = async () => {
    const todoTrimmed = todoName.trim();
    if (!todoTrimmed) return;
    try {
      await createTodo({
        userId: USERID,
        title: todoTrimmed,
        completed: false,
      });
      setTodoName("");
    } catch (error) {
      console.log("Create error:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#239b56",
            colorPrimaryHover: "#239b56",
            colorPrimaryBorder: "#239b56",
          },
        }}
      >
        <Input
          value={todoName}
          placeholder="Input your todo list."
          onChange={(e) => setTodoName(e.target.value)}
          disabled={isLoading}
        />
        <Button
          onClick={handleCreateTodo}
          loading={isLoading}
          disabled={!todoName}
        >
          Add
        </Button>
      </ConfigProvider>
    </div>
  );
};

export default CreateTodoForm;
