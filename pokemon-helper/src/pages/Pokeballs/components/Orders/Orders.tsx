import { Flex } from "antd";
import { useUnit } from "effector-react";
import { $orders } from "../../store";
import { OrderItem } from "./components/OrderItem/OrderItem";

export const Orders = () => {
  const orders = useUnit($orders);
  return (
    <Flex vertical gap={16}>
      {orders.map((item) => (
        <OrderItem order={item} key={item.id} />
      ))}
    </Flex>
  );
};
