import type { FC } from "react";
import { $filaments, type TPokeballFilament } from "../../../../store";
import { useUnit } from "effector-react";
import styles from "./PokeballsFilament.module.css";
import { Button, Flex } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FormInput } from "../../../../../../components/Form/components/Input/Input";
import { FormSelect } from "../../../../../../components/Form/components/Select/Select";

type Props = {
  items: Partial<TPokeballFilament>[];
  onChange: (data: Partial<TPokeballFilament>[]) => void;
};

export const PokeballFilaments: FC<Props> = ({ items, onChange }) => {
  const filaments = useUnit($filaments);

  const handleAddFilament = () => {
    onChange([...items, {}]);
  };

  const handleChangeFilament = (index: number) => (id: string) => {
    onChange(items.map((item, i) => (index === i ? { ...item, id } : item)));
  };

  const handleChangeFilamentCount = (index: number) => (value: string) => {
    onChange(
      items.map((item, i) =>
        index === i
          ? {
              ...item,
              count: value ? Number(value) : undefined,
            }
          : item
      )
    );
  };

  const handleRemoveFilament = (index: number) => () => {
    onChange(items.filter((_, i) => index !== i));
  };

  return (
    <div className={styles.filamentList}>
      {items.map((item, index) => (
        <Flex align="flex-end" key={index} className={styles.filamentItem}>
          <FormSelect
            options={filaments.map((item) => ({
              label: item.title,
              value: item.id,
            }))}
            label="Филамент"
            value={item.id}
            onChange={handleChangeFilament(index)}
            placeholder="Выберите значение"
            fixedWidth={200}
          />
          <FormInput
            value={item.count}
            onChange={handleChangeFilamentCount(index)}
            label="Кол-во (г.)"
            placeholder="0"
          />
          <Button
            color="red"
            variant="outlined"
            style={{ width: 90 }}
            onClick={handleRemoveFilament(index)}
            icon={<DeleteOutlined />}
            block
          />
        </Flex>
      ))}
      <div className={styles.filamentItem}>
        <Button onClick={handleAddFilament} block>
          Добавить
        </Button>
      </div>
    </div>
  );
};
