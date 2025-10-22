import { Button, Flex, Tag, Typography } from "antd";
import {
  $pokeballs,
  OrderItemStatuses,
  ordersFxs,
  OrderStatues,
  type TOrder,
} from "../../../../store";
import { useState, type FC } from "react";
import { useUnit } from "effector-react";
import {
  AccessoriesLang,
  OrderItemStatusesColor,
  OrderItemStatusesLang,
} from "../../../../constants";
import {
  CaretUpOutlined,
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Price } from "./components/Price/Price";
import { OrderContainer } from "./components/mini-components";
import { HiddenOrder } from "./components/HiddenOrder/HiddenOrder";
import { OrderStatus } from "./components/OrderStatus/OrderStatus";

type Props = {
  order: TOrder;
};

export const OrderItem: FC<Props> = ({ order }) => {
  const pokeballs = useUnit($pokeballs);
  const [isHidden, setIsHidden] = useState(
    [OrderStatues.DONE, OrderStatues.CANCELED].includes(order.status)
  );

  const handleChangeOrderStatus = (status: OrderStatues) => () => {
    ordersFxs.updateFx({
      ...order,
      status,
    });
  };

  const handleChangeOrderItemStatus =
    (status: OrderItemStatuses, index: number) => () => {
      ordersFxs.updateFx({
        ...order,
        items: order.items.map((item, i) =>
          i === index ? { ...item, status } : item
        ),
      });
    };

  if (isHidden)
    return <HiddenOrder onShow={() => setIsHidden(false)} order={order} />;

  return (
    <OrderContainer>
      <Flex gap={8}>
        <Button
          onClick={() => setIsHidden(true)}
          icon={<CaretUpOutlined />}
          size="small"
        />
        <Flex style={{ flexGrow: 1 }} vertical>
          <Typography.Text>Имя клиента: {order.clientName}</Typography.Text>
          <Typography.Text>
            Ссылка: <a href={order.clientLink}>{order.clientLink}</a>
          </Typography.Text>
        </Flex>
        <Flex vertical>
          <Price {...order} />
          <Flex gap={6} align="flex-end" vertical>
            <OrderStatus {...order} />
            <Flex gap={6}>
              <Button
                icon={<CloseOutlined />}
                color="red"
                variant="outlined"
                size="small"
                onClick={handleChangeOrderStatus(OrderStatues.CANCELED)}
              />
              <Button
                icon={<LoadingOutlined />}
                color="blue"
                variant="outlined"
                size="small"
                onClick={handleChangeOrderStatus(OrderStatues.IN_PROGRESS)}
              />
              <Button
                icon={<TruckOutlined />}
                color="blue"
                variant="outlined"
                size="small"
                onClick={handleChangeOrderStatus(OrderStatues.DELIVERING)}
              />
              <Button
                icon={<CheckOutlined />}
                color="green"
                variant="outlined"
                size="small"
                onClick={handleChangeOrderStatus(OrderStatues.DONE)}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex vertical>
        <h3 style={{ marginTop: 8 }}>Позиции</h3>
        <Flex>
          {order.items.map((item, index) => {
            const pokeball = pokeballs.find((i) => item.pokeballId === i.id);
            return (
              <Flex style={{ width: "100%" }} align="flex-start" gap={24}>
                <Flex vertical>
                  <Typography.Text strong>{pokeball?.name}</Typography.Text>
                  <img
                    src={`/api/images?name=${pokeball?.images[0]}`}
                    style={{ width: 70, height: 70, objectFit: "cover" }}
                  />
                </Flex>

                <Flex vertical>
                  <Typography.Text strong>Аксесуары</Typography.Text>
                  {item.accessories.map((i) => (
                    <div>{AccessoriesLang[i[0]]}</div>
                  ))}
                  <Typography.Text italic>
                    Комментарий: {item.comment || "-"}
                  </Typography.Text>
                </Flex>
                <Flex vertical gap={6} style={{ flexGrow: 1 }} align="flex-end">
                  <Tag
                    style={{ marginRight: 0 }}
                    color={OrderItemStatusesColor[item.status]}
                  >
                    {OrderItemStatusesLang[item.status]}
                  </Tag>
                  <Flex gap={6}>
                    <Button
                      icon={<LoadingOutlined />}
                      color="blue"
                      variant="outlined"
                      size="small"
                      onClick={handleChangeOrderItemStatus(
                        OrderItemStatuses.IN_PROGRESS,
                        index
                      )}
                    />
                    <Button
                      icon={<CheckOutlined />}
                      color="green"
                      variant="outlined"
                      size="small"
                      onClick={handleChangeOrderItemStatus(
                        OrderItemStatuses.DONE,
                        index
                      )}
                    />
                  </Flex>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </OrderContainer>
  );
};
