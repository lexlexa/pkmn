import type { FC } from "react";
import type { TOrder } from "../../../../../../store";
import { OrderContainer } from "../mini-components";
import { Button, Flex } from "antd";
import { OrderStatus } from "../OrderStatus/OrderStatus";
import { Price } from "../Price/Price";
import { CaretDownOutlined } from "@ant-design/icons";

type Props = {
  order: TOrder;
  onShow: () => void;
};

export const HiddenOrder: FC<Props> = ({ order, onShow }) => {
  return (
    <OrderContainer>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={8}>
          <Button onClick={onShow} icon={<CaretDownOutlined />} size="small" />
          <a href={order.clientLink}>{order.clientName}</a>
        </Flex>
        <Flex align="center" gap={16}>
          <Price {...order} size="small" />
          <OrderStatus {...order} />
        </Flex>
      </Flex>
    </OrderContainer>
  );
};
