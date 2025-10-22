import { Flex } from "antd";
import type { FC, PropsWithChildren } from "react";

export const OrderContainer: FC<PropsWithChildren> = ({ children }) => (
  <Flex
    style={{
      boxShadow: "0 0 4px 0 black",
      borderRadius: 8,
      width: "100%",
      padding: 16,
    }}
    vertical
  >
    {children}
  </Flex>
);
