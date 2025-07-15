import { Button, ConfigProvider, type ButtonProps } from "antd";
import type { ReactNode } from "react";

type ThemedButtonProps = {
  themeColor: string;
  children?: ReactNode;
};

const ButtonAction = ({
  themeColor,
  children,
  ...props
}: ButtonProps & ThemedButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveColor: themeColor,
            defaultActiveBorderColor: themeColor,
            defaultHoverBorderColor: themeColor,
            defaultHoverColor: themeColor,
          },
        },
      }}
    >
      <Button {...props}>{children}</Button>
    </ConfigProvider>
  );
};

export default ButtonAction;
