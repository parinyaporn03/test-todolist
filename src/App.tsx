import { ConfigProvider } from "antd";
import TodoList from "./pages/TodoList";
import "@ant-design/v5-patch-for-react-19";
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryHover: "#34495e",
          colorPrimaryBorder: "#34495e",
          colorPrimary: "#34495e",
        },
      }}
    >
      <TodoList />
    </ConfigProvider>
  );
}

export default App;
