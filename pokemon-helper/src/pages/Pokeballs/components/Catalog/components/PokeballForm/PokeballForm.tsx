import { Button, Drawer, Flex } from "antd";
import { type FC } from "react";
import { pokeballsFxs, type TPokeball } from "../../../../store";
import { generateUUID } from "../../../../../Sale/helpers";
import { usePokeballForm, withPokeballFormProvider } from "./form";
import { PokeballsGeneral } from "./components/PokeballsGeneral/PokeballsGeneral";
import { PokeballFilaments } from "./components/PokeballsFilament/PokeballsFilaments";
import { PokeballsImages } from "./components/PokeballsImages/PokeballsImages";
import { PokeballsPrice } from "./components/PokeballsPrice/PokeballsPrice";

export type TPokebalFormProps = {
  open: boolean;
  onClose: () => void;
  item?: TPokeball;
};

export const PokeballForm: FC<TPokebalFormProps> = withPokeballFormProvider(({ open, onClose, item }) => {
  const { values, isValidForm } = usePokeballForm()


  const handleSubmit = async () => {
    const data: TPokeball = {
      ...values,
      id: item?.id ? item.id : generateUUID(),
      createdAt: item?.createdAt || new Date().toISOString(),
    };

    const action = item?.id ? pokeballsFxs.updateFx : pokeballsFxs.createFx

    await action(data)
    onClose()
  }

  return (
    <Drawer open={open} onClose={onClose}>
      <Flex vertical gap={8}>
        <PokeballsGeneral />
        <PokeballFilaments />
        <PokeballsImages />
        <PokeballsPrice />
        <Button disabled={!isValidForm} onClick={handleSubmit}>
          Сохранить
        </Button>
      </Flex>
    </Drawer>
  );
});
