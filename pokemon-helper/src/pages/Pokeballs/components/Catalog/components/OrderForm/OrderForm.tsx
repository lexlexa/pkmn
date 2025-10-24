import { Button, Drawer, Flex } from "antd";
import { OrderItem } from "./components/OrderItem/OrderItem";
import { PlusOutlined } from "@ant-design/icons";
import { type FC } from "react";
import {
  $configs,
  ordersFxs,
  OrderStatues,
  type TOrder,
  type TOrderItem,
} from "../../../../store";
import { generateUUID } from "../../../../../Sale/helpers";
import { FormSwitch } from "../../../../../../components/Form/components/Switch/Switch";
import { FormInput } from "../../../../../../components/Form/components/Input/Input";
import { PriceLine } from "../../../../../../components/PriceLine/PriceLine";
import { useUnit } from "effector-react";
import { getDiscountedPrice } from "../../../../helpers/discount";
import { useOrderForm, withOrderFormProvider } from "./form";

export type TOrderFormProps = {
  open: boolean;
  onClose: () => void;
};

export const OrderForm: FC<TOrderFormProps> = withOrderFormProvider(({ open, onClose }) => {
  const {
    isValidForm,
    values: { items, additionalDiscountPercent, clientLink, clientName, isSubscriber },
    handlers: { addItem, setClientLink, setClientName, setAdditionalDiscountPercent, setIsSubscriber } } = useOrderForm()

  const configs = useUnit($configs);




  const finalPrice = items.reduce((acc, curr) => {
    const accessoriesPrice =
      curr.accessories?.reduce((accc, [_, price]) => accc + Number(price), 0) ||
      0;
    return acc + Number(curr.price) + accessoriesPrice;
  }, 0);

  const finalPriceWithDiscount = getDiscountedPrice(
    finalPrice,
    configs.followersDiscount
  );
  const finalPriceWithDiscount2 = additionalDiscountPercent
    ? getDiscountedPrice(finalPrice, Number(additionalDiscountPercent))
    : finalPriceWithDiscount;

  const handleSave = () => {
    const data: TOrder = {
      items: items as TOrderItem[],
      price: finalPrice.toString(),
      discountPrice:
        isSubscriber || additionalDiscountPercent
          ? finalPriceWithDiscount2
          : undefined,
      clientLink,
      clientName,
      id: generateUUID(),
      isSubscriber,
      status: OrderStatues.NONE,
      additionalDiscountPercent: additionalDiscountPercent,
      createdAt: new Date().toISOString(),
    };

    ordersFxs.createFx(data);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <Flex vertical gap={16}>
        <Button disabled={!isValidForm} onClick={handleSave}>
          Сохранить
        </Button>
        <Flex vertical gap={4}>
          <PriceLine title="Суммараная стоимость" price={finalPrice} />
          <PriceLine
            title="Суммараная стоимость (скидка)"
            price={
              isSubscriber || additionalDiscountPercent
                ? finalPriceWithDiscount2
                : undefined
            }
          />
        </Flex>
        <FormInput
          value={clientName}
          onChange={setClientName}
          label="Имя клиента"
          placeholder="Иван Иванов"
        />
        <FormInput
          value={clientLink}
          onChange={setClientLink}
          label="Ссылка"
          placeholder="t.me/example"
        />
        <FormSwitch
          checked={isSubscriber}
          onChange={setIsSubscriber}
          label="Клиент-подписчик"
        />
        <FormInput
          value={additionalDiscountPercent}
          onChange={setAdditionalDiscountPercent}
          label="Дополнительная скидка"
          placeholder="%"
        />
        {items.map((item, index) => (
          <OrderItem
            key={item.id}
            index={index}
            item={item}
          />
        ))}
        <Button onClick={addItem} icon={<PlusOutlined />}>
          Добавить
        </Button>
      </Flex>
    </Drawer>
  );
});
