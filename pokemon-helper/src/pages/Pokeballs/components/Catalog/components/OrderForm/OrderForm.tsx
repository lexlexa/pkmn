import { Button, Drawer, Flex } from "antd";
import { OrderItem } from "./components/OrderItem/OrderItem";
import { PlusOutlined } from "@ant-design/icons";
import { useState, type FC } from "react";
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

type Props = {
  open: boolean;
  onClose: () => void;
};

export const OrderForm: FC<Props> = ({ open, onClose }) => {
  const [items, setItems] = useState<Partial<TOrderItem>[]>([]);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientLink, setClientLink] = useState("");
  const [additionalDiscount, setAdditionalDiscount] = useState("");
  const configs = useUnit($configs);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: generateUUID(),
      },
    ]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleChangeItem = (item: Partial<TOrderItem>) => {
    setItems(items.map((saved) => (saved.id === item.id ? item : saved)));
  };

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
  const finalPriceWithDiscount2 = additionalDiscount
    ? getDiscountedPrice(finalPrice, Number(additionalDiscount))
    : finalPriceWithDiscount;

  const handleSave = () => {
    const data: TOrder = {
      items: items as TOrderItem[],
      price: finalPrice.toString(),
      discountPrice:
        isSubscriber || additionalDiscount
          ? finalPriceWithDiscount2
          : undefined,
      clientLink,
      clientName,
      id: generateUUID(),
      isSubscriber,
      status: OrderStatues.NONE,
      additionalDiscountPercent: additionalDiscount,
    };

    ordersFxs.createFx(data);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <Flex vertical gap={16}>
        <Button onClick={handleSave}>Сохранить</Button>
        <Flex vertical gap={4}>
          <PriceLine title="Суммараная стоимость" price={finalPrice} />
          <PriceLine
            title="Суммараная стоимость (скидка)"
            price={
              isSubscriber || additionalDiscount
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
          value={additionalDiscount}
          onChange={setAdditionalDiscount}
          label="Дополнительная скидка"
          placeholder="%"
        />
        {items.map((item, index) => (
          <OrderItem
            key={item.id}
            index={index}
            onChange={handleChangeItem}
            onDelete={handleDeleteItem}
            item={item}
          />
        ))}
        <Button onClick={handleAddItem} icon={<PlusOutlined />}>
          Добавить
        </Button>
      </Flex>
    </Drawer>
  );
};
