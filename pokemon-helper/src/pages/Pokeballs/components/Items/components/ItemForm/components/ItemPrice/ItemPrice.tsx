import { Flex } from "antd";
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input";
import { PriceLine } from "../../../../../../../../components/PriceLine/PriceLine";

import { useItemForm } from "../../form";
import { usePrice } from "../../../../../Catalog/components/PokeballForm/helpers/use-price";

export const ItemPrice = () => {
  const {
    values: { items_filament, price },
    handlers: { setPrice } } = useItemForm()

  const filamentTotal = items_filament.reduce(
    (acc, curr) => acc + Number(curr.count || 0),
    0
  );

  const priceItems = usePrice(price || 0, filamentTotal);



  return (
    <Flex
      style={{
        padding: 16,
        boxShadow: "0 0 4px 0 black",
        borderRadius: 8
      }}
      gap={16}
      vertical
    >
      <FormInput
        label="Цена"
        onChange={setPrice}
        value={price}
        required
      />
      <Flex vertical>
        {priceItems.map((item) => (
          <PriceLine title={item.label} price={item.value} />
        ))}
      </Flex>
    </Flex>
  );
};
