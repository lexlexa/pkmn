import { Flex, Typography } from "antd";
import type { FC } from "react";

type Props = {
  title: string;
  price: string | number;
  discountedPrice?: string | number;
};

export const PriceLine: FC<Props> = ({ title, price, discountedPrice }) => {
  return (
    <Flex justify="space-between">
      <span>{title}</span>
      <Flex gap={4}>
        <Typography.Text
          type={discountedPrice ? "secondary" : undefined}
          delete={!!discountedPrice}
        >
          {Number(price).toFixed(2)}р
        </Typography.Text>
        {discountedPrice && <Typography>{discountedPrice}р</Typography>}
      </Flex>
    </Flex>
  );
};
