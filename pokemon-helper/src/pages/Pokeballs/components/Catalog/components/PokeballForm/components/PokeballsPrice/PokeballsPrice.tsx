import { Flex } from "antd";
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input";
import { PriceLine } from "../../../../../../../../components/PriceLine/PriceLine";
import { usePrice } from "../../helpers/use-price";
import { usePokeballForm } from "../../form";

export const PokeballsPrice = () => {
  const {
    values: { filament, price },
    handlers: { setPrice } } = usePokeballForm()

  const filamentTotal = filament.reduce(
    (acc, curr) => acc + Number(curr.count || 0),
    0
  );

  const priceItems = usePrice(price, filamentTotal);



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
