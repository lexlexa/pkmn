import { Button, Dropdown, Flex, Typography } from "antd";
import { FormSelect } from "../../../../../../../../components/Form/components/Select/Select";
import { useUnit } from "effector-react";
import {
  $configs,
  $pokeballs,
  Accessories,
  type TOrderItem,
} from "../../../../../../store";
import { useEffect, useState, type FC } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input";
import { AccessoriesLang } from "../../../../../../constants";
import { FormTextarea } from "../../../../../../../../components/Form/components/Textarea/Textarea";
import { PriceLine } from "../../../../../../../../components/PriceLine/PriceLine";
import { getDiscountedPrice } from "../../../../../../helpers/discount";

type Props = {
  item: Partial<TOrderItem>;
  index: number;
  isSubscriber: boolean;
  onChange: (item: Partial<TOrderItem>) => void;
  onDelete: (id: string) => void;
};

export const OrderItem: FC<Props> = ({
  item,
  onChange,
  onDelete,
  index,
  isSubscriber,
}) => {
  const [showLess, setShowLess] = useState(Boolean(item.pokeballId));
  const pokeballs = useUnit($pokeballs);
  const configs = useUnit($configs);

  const selectedPokeball = pokeballs.find((poc) => poc.id === item.pokeballId);

  const handleChangePokeball = (value: string) => {
    onChange({
      ...item,
      pokeballId: value,
      price: pokeballs.find((i) => i.id === value)?.price.toString() || "",
    });
  };

  const handleChangePrice = (value: string) => {
    onChange({ ...item, price: value });
  };

  const handleAddAccessory = (value: Accessories) => {
    const acc = [
      value,
      configs.accessoriesPrices[value],
    ] as TOrderItem["accessories"][0];
    onChange({
      ...item,
      accessories: item.accessories ? [...item.accessories, acc] : [acc],
    });
  };

  const handleRemoveAccesory = (index: number) => {
    onChange({
      ...item,
      accessories: item.accessories?.filter((_, i) => i !== index) || [],
    });
  };

  const handleChangeComment = (value: string) => {
    onChange({
      ...item,
      comment: value,
    });
  };

  useEffect(() => {
    onChange({
      ...item,
      discountPrice: isSubscriber
        ? getDiscountedPrice(item.price || 0, configs.followersDiscount)
        : undefined,
    });
  }, [item.price]);

  return (
    <Flex
      vertical
      gap={8}
      style={{ boxShadow: "0 0 4px 0 black", padding: 8, borderRadius: 8 }}
    >
      <Flex justify="space-between">
        <Typography.Text strong>Позиция {index + 1}</Typography.Text>
        <Flex gap={8}>
          <Button
            onClick={() => onDelete(item.id!)}
            color="red"
            size="small"
            variant="outlined"
          >
            Удалить
          </Button>
          {item.pokeballId && (
            <Button
              size="small"
              onClick={() => setShowLess(!showLess)}
              icon={!showLess ? <CaretUpOutlined /> : <CaretDownOutlined />}
            />
          )}
        </Flex>
      </Flex>
      {showLess ? (
        <Flex vertical>
          <PriceLine
            title={selectedPokeball?.name || ""}
            price={item.price || ""}
            discountedPrice={item.discountPrice}
          />
          {item.accessories?.map(([name, price]) => (
            <PriceLine title={AccessoriesLang[name]} price={price} />
          ))}
        </Flex>
      ) : (
        <>
          <Flex gap={8} style={{ width: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <FormSelect
                value={item.pokeballId}
                onChange={handleChangePokeball}
                label={`Покебол`}
                fixedWidth="100%"
                options={pokeballs.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </div>
            {selectedPokeball && (
              <img
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
                src={`/api/images?name=${selectedPokeball.images[0]}`}
              />
            )}
          </Flex>
          <Flex style={{ width: "100%" }}>
            <FormInput
              fullWidth
              label={`Цена${
                isSubscriber && item.pokeballId
                  ? ` (${Number(item.discountPrice).toFixed(2)}р)`
                  : ""
              }`}
              value={item.price}
              onChange={handleChangePrice}
            />
          </Flex>
          <Flex vertical>
            <Flex gap={16}>
              <Typography.Text strong>Аксесуары</Typography.Text>
              <Dropdown
                trigger={["click"]}
                getPopupContainer={() => document.body}
                menu={{
                  items: Object.keys(configs.accessoriesPrices).map((key) => ({
                    key,
                    label: AccessoriesLang[key as Accessories],
                    onClick: () => handleAddAccessory(key as Accessories),
                  })),
                }}
              >
                <Button size="small" icon={<PlusOutlined />} />
              </Dropdown>
            </Flex>
            <Flex vertical>
              {item.accessories?.map(([key, price], index) => (
                <Flex align="center" justify="space-between">
                  <Flex>{AccessoriesLang[key]}</Flex>
                  <Flex gap={8} align="center">
                    <span>{price}р</span>
                    <Button
                      color="red"
                      variant="outlined"
                      size="small"
                      onClick={() => handleRemoveAccesory(index)}
                      icon={<DeleteOutlined />}
                    />
                  </Flex>
                </Flex>
              ))}
            </Flex>
            <FormTextarea
              label="Комментарий"
              value={item.comment}
              onChange={handleChangeComment}
              placeholder="Примечание к товару"
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
