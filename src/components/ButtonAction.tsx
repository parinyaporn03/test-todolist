import { Button, ConfigProvider, type ButtonProps } from "antd";
import type { ReactNode } from "react";

interface ButtonActionProps extends Omit<ButtonProps, "color"> {
  color: string;
  children?: ReactNode;
}

const ButtonAction = ({ color, children, ...props }: ButtonActionProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color,
          colorPrimaryHover: color,
          colorPrimaryBorder: color,
        },
      }}
    >
      <Button {...props}>{children}</Button>
    </ConfigProvider>
  );
};

export default ButtonAction;
