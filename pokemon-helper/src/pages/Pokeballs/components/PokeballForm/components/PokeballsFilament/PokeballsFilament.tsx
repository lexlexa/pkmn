import type { FC } from "react";
import { $filaments, type TPokeballFilament } from "../../../../store";
import { useUnit } from "effector-react";
import styles from "./PokeballsFilament.module.css";
import { Button, Input, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

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

  const handleChangeFilamentCount =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(
        items.map((item, i) =>
          index === i
            ? {
                ...item,
                count: e.target.value ? Number(e.target.value) : undefined,
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
      <h3>Филамент</h3>
      {items.map((item, index) => (
        <div key={index} className={styles.filamentItem}>
          <Select
            style={{ width: 180, flexShrink: 0 }}
            showSearch
            optionFilterProp="label"
            options={filaments.map((item) => ({
              label: item.title,
              value: item.id,
            }))}
            value={item.id || null}
            onChange={handleChangeFilament(index)}
            placeholder="Выберите значение"
          />
          <Input
            value={item.count}
            onChange={handleChangeFilamentCount(index)}
            placeholder="Количество"
          />
          <Button
            color="red"
            variant="solid"
            style={{ width: 100 }}
            onClick={handleRemoveFilament(index)}
            icon={<DeleteOutlined />}
            block
          />
        </div>
      ))}
      <div className={styles.filamentItem}>
        <Button onClick={handleAddFilament} block>
          Добавить
        </Button>
      </div>
    </div>
  );
};
