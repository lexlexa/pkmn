import type { FC } from "react";
import { OrderStatues, type TOrder } from "../../../../../../store";
import { Flex } from "antd";

type Props = Pick<TOrder, "discountPrice" | "price" | "status"> & {
  size?: "default" | "small";
};

export const Price: FC<Props> = ({
  status,
  price,
  discountPrice,
  size = "default",
}) => {
  const finalPrice =
    status === OrderStatues.CANCELED ? 0 : discountPrice || price;
  const legacyPrice =
    status === OrderStatues.CANCELED || discountPrice ? price : undefined;

  return (
    <Flex
      gap={8}
      justify="flex-end"
      style={{ fontSize: size === "default" ? 18 : 14 }}
    >
      {legacyPrice && (
        <div
          style={{
            textDecoration: "line-through",
          }}
        >
          {Number(legacyPrice).toFixed(2)}р
        </div>
      )}
      <div>{finalPrice}р</div>
    </Flex>
  );
};
