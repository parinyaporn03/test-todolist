import { Button, ConfigProvider, Input } from "antd";
import { useState, type Dispatch, type SetStateAction } from "react";

type CreateTodoFormProps = {
  onCreate: (
    todo: string,
    setTodoName: Dispatch<SetStateAction<string>>
  ) => void;
  isLoading: boolean;
};

const CreateTodoForm = ({ onCreate, isLoading }: CreateTodoFormProps) => {
  const [todoName, setTodoName] = useState("");

  const fnHandleAdd = () => {
    onCreate(todoName, setTodoName);
  };

  return (
    <div className="flex gap-2">
      <ConfigProvider
        theme={{
          components: {
            Input: {
              hoverBorderColor: "#239b56",
              activeBorderColor: "#239b56",
            },
            Button: {
              defaultHoverBorderColor: "#239b56 ",
              defaultHoverColor: "#239b56 ",
            },
          },
        }}
      >
        <Input
          value={todoName}
          placeholder="Input your todo list."
          onChange={(e) => setTodoName(e.target.value)}
          disabled={isLoading}
        />
        <Button onClick={fnHandleAdd} loading={isLoading} disabled={!todoName}>
          Add
        </Button>
      </ConfigProvider>
    </div>
  );
};

export default CreateTodoForm;
