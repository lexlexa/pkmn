import { Flex, Typography } from "antd";
import type { TOrder } from "../../../store";
import type { FC } from "react";

type Props = {
  order: TOrder;
};

export const OrderItem: FC<Props> = ({ order }) => {
  return (
    <Flex
      style={{ border: "1px solid black", width: "100%", padding: 16 }}
      vertical
    >
      <Typography.Text>Имя клиента: {order.clientName}</Typography.Text>
      <Typography.Text>
        Ссылка: <a href={order.clientLink}>{order.clientLink}</a>
      </Typography.Text>
    </Flex>
  );
};
