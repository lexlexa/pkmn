import { Flex, Typography } from "antd";
import { FormSelect } from "../../../../../../../../components/Form/components/Select/Select";
import { useUnit } from "effector-react";
import {
  $pokeballs,
  type TOrderItem,
} from "../../../../../../store";
import { useEffect, useState, type FC } from "react";
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input";
import { AccessoriesLang } from "../../../../../../constants";
import { FormTextarea } from "../../../../../../../../components/Form/components/Textarea/Textarea";
import { PriceLine } from "../../../../../../../../components/PriceLine/PriceLine";
import { DeleteButton, ExpandButton } from "./mini-components";
import { useOrderForm } from "../../form";
import { OrderItemAccessories } from "./OrderItemAccessories";

type Props = {
  item: TOrderItem;
  index: number;
};

export const OrderItem: FC<Props> = ({ item, index }) => {
  const {
    handlers: { setItemPokeballId, setItemComment, setItemPrice, deleteItem }
  } = useOrderForm()
  const [showLess, setShowLess] = useState(Boolean(item.pokeballId));
  const pokeballs = useUnit($pokeballs);

  const selectedPokeball = pokeballs.find((poc) => poc.id === item.pokeballId);

  useEffect(() => {
    if (selectedPokeball) {
      setItemPrice(item.id)(selectedPokeball.price)
    }
  }, [selectedPokeball])

  return (
    <Flex
      vertical
      gap={8}
      style={{ boxShadow: "0 0 4px 0 black", padding: 8, borderRadius: 8 }}
    >
      <Flex justify="space-between">
        <Typography.Text strong>Позиция {index + 1}</Typography.Text>
        <Flex gap={8}>
          <DeleteButton onClick={deleteItem(item.id!)} />
          {item.pokeballId && (
            <ExpandButton
              onClick={() => setShowLess(!showLess)}
              hidden={showLess}
            />
          )}
        </Flex>
      </Flex>
      {showLess ? (
        <Flex vertical>
          <PriceLine
            title={selectedPokeball?.name || ""}
            price={item.price || ""}
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
                onChange={setItemPokeballId(item.id)}
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
              label="Цена"
              value={item.price}
              onChange={setItemPrice(item.id)}
            />
          </Flex>
          <Flex vertical>
            <OrderItemAccessories accessories={item.accessories} itemId={item.id} />
            <FormTextarea
              label="Комментарий"
              value={item.comment}
              onChange={setItemComment(item.id)}
              placeholder="Примечание к товару"
            />
          </Flex>
        </>
      )
      }
    </Flex >
  );
};
