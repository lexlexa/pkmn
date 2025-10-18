import { Flex } from "antd";
import { useUnit } from "effector-react";
import type { FC } from "react";
import { $configs } from "../../../../../../store";
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input";

type Props = {
  price: number | string | null;
  setPrice: (price: number | string) => void;
  filamentTotal: number;
};

type TItem = { label: string; value: string | number; items?: TItem[] };

const PriceStat: FC<{
  item: TItem;
  level?: number;
}> = ({ item, level = 0 }) => {
  return (
    <>
      <Flex
        style={{
          paddingLeft: level * 16,
          fontSize: level === 0 ? 13 : 11,
          color: level === 0 ? "black" : "gray",
        }}
      >
        <span>{item.label}</span>
        <div
          style={{
            borderBottom: "1px dotted black",
            flexGrow: 1,
            marginBottom: 2,
          }}
        />
        <span>{Number(item.value).toFixed(2)}р</span>
      </Flex>
      {item?.items?.map((i) => (
        <PriceStat level={level + 1} item={i} />
      ))}
    </>
  );
};

export const PokeballsPrice: FC<Props> = ({
  price,
  setPrice,
  filamentTotal,
}) => {
  const configs = useUnit($configs);
  const rawPrice =
    configs.packingPrice +
    filamentTotal * configs.filamentCoeff +
    configs.electricityPrice +
    configs.packingPrice;
  const commonIncome = Number(price || 0) - rawPrice;

  const income = {
    common: commonIncome,
    follower: commonIncome - (commonIncome / 100) * configs.followersDiscount,
  };

  const items = [
    {
      label: "Себестоимость",
      value: rawPrice,
      items: [
        { label: "Филамент", value: filamentTotal * configs.filamentCoeff },
        { label: "Упаковка", value: configs.packingPrice },
        { label: "Электричество", value: configs.electricityPrice },
      ],
    },
    { label: "Прибыль", value: income.common },
    { label: "Прибыль (подписчик)", value: income.follower },
  ];

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
          {items.map((item) => (
            <PriceStat item={item} />
          ))}
        </Flex>
      </Flex>
    </>
  );
};
