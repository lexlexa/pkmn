import type { FC } from "react";
import { fetchChangeFilamentStockFx, type Filament } from "../../store";
import styles from "./FilamentItem.module.css";
import { Button, Switch } from "antd";

type Props = {
  item: Filament;
  onEdit: (id: string) => void;
};

export const FilamentItem: FC<Props> = ({ item, onEdit }) => {
  const handleChangeStock = (value: boolean) => () => {
    fetchChangeFilamentStockFx({ id: item.id, inStock: value });
  };

  return (
    <div
      className={styles.item}
      style={{ backgroundColor: item.inStock ? "" : "#ffe2e2" }}
    >
      <div className={styles.marker} style={{ backgroundColor: item.color }} />
      <div className={styles.title}>{item.title}</div>
      <div className={styles.inStock}>
        В наличии
        <Switch
          checked={item.inStock}
          onChange={handleChangeStock(!item.inStock)}
        />
      </div>
      <Button onClick={() => onEdit(item.id)}>Редактировать</Button>
    </div>
  );
};
