import type { FC } from "react";
import { filamentsFxs, type TFilament } from "../../../../store";
import { Button, Flex, Input, Switch, Typography } from "antd";
import { useForm } from "../../../../../../helpers/form";
import { generateUUID } from "../../../../../Sale/helpers";

type Props = {
  item?: TFilament;
  onCancel: () => void;
};

export const FilamentForm: FC<Props> = ({ item, onCancel }) => {
  const { values, onInputChange, onCheckboxChange, handleSubmit } = useForm({
    defaultValues: {
      title: item?.title || "",
      code: item?.code || "",
      color: item?.color || "",
      inStock: item?.inStock || false,
    },
    onSubmit: async (data) => {
      if (item) {
        await filamentsFxs.updateFx({ ...item, ...data });
      } else {
        await filamentsFxs.createFx({ ...data, id: generateUUID() });
      }
      onCancel();
    },
  });

  return (
    <Flex vertical gap={8}>
      <Typography.Title style={{ marginTop: 0 }} level={5}>
        {item ? "Изменить филамент" : "Добавить филамент"}{" "}
      </Typography.Title>
      <Input
        value={values.title}
        onChange={onInputChange("title")}
        placeholder="Название"
      />
      <Flex gap={8}>
        <Input
          value={values.code}
          onChange={onInputChange("code")}
          placeholder="Код"
        />
        <Input
          value={values.color}
          onChange={onInputChange("color")}
          placeholder="Цвет"
        />
      </Flex>
      <Flex gap={8}>
        В наличии{" "}
        <Switch
          checked={values.inStock}
          onChange={onCheckboxChange("inStock")}
        />
      </Flex>
      <Button onClick={handleSubmit}>Сохранить</Button>
    </Flex>
  );
};
