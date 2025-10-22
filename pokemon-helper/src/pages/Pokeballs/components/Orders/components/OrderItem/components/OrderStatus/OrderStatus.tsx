import type { FC } from "react";
import type { TOrder } from "../../../../../../store";
import {
  OrderStatusesColor,
  OrderStatusesLang,
} from "../../../../../../constants";
import { Tag } from "antd";

export const OrderStatus: FC<Pick<TOrder, "status">> = ({ status }) => {
  return (
    <Tag style={{ marginRight: 0 }} color={OrderStatusesColor[status]}>
      {OrderStatusesLang[status]}
    </Tag>
  );
};
