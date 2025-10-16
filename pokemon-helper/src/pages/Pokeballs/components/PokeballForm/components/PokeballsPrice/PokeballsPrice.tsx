import { Flex, Input } from "antd";
import { useUnit } from "effector-react";
import type { FC } from "react";
import { $configs } from "../../../../store";

type Props = {
  price: number | null;
  setPrice: (price: number) => void;
  filamentTotal: number;
};

export const PokeballsPrice: FC<Props> = ({
  price,
  setPrice,
  filamentTotal,
}) => {
  const configs = useUnit($configs);

  const commonIncome =
    (price || 0) - configs.filamentCoeff * filamentTotal - configs.packingPrice;
  const income = {
    common: commonIncome,
    follower: commonIncome - (commonIncome / 100) * configs.followersDiscount,
    rawPrice: configs.packingPrice + filamentTotal * configs.filamentCoeff,
  };

  return (
    <>
      <h3>Цена</h3>
      <Flex
        style={{ padding: 16, boxShadow: "0 0 4px 0 black", borderRadius: 8 }}
        gap={16}
        vertical
      >
        <Input
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value || 0))}
          placeholder="Цена"
        />

        <Flex vertical>
          <Flex justify="space-between">
            <span>Себестоимость</span>
            <span>{income.rawPrice}</span>
          </Flex>
          <Flex justify="space-between">
            <span>Прибыль</span>
            <span>{income.common}</span>
          </Flex>
          <Flex justify="space-between">
            <span>Прибыль (подписчик)</span>
            <span>{income.follower}</span>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
