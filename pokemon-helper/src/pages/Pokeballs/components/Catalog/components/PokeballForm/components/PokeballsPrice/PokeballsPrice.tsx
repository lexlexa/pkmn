import { Flex } from "antd";
import type { FC } from "react";
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input";
import { PriceLine } from "../../../../../../../../components/PriceLine/PriceLine";
import { usePrice } from "../../helpers/use-price";

type Props = {
  price: number | string | null;
  setPrice: (price: number | string) => void;
  filamentTotal: number;
};

export const PokeballsPrice: FC<Props> = ({
  price,
  setPrice,
  filamentTotal,
}) => {
  const priceItems = usePrice(price, filamentTotal);

  return (
    <>
      <Flex
        style={{ padding: 16, boxShadow: "0 0 4px 0 black", borderRadius: 8 }}
        gap={16}
        vertical
      >
        <FormInput
          label="Цена"
          onChange={(value) => setPrice(value)}
          value={price || ""}
        />
        <Flex vertical>
          {priceItems.map((item) => (
            <PriceLine title={item.label} price={item.value} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
