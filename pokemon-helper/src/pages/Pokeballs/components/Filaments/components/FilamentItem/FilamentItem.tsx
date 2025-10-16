import type { FC } from "react";
import { filamentsFxs, type TFilament } from "../../../../store";
import styles from "./FilamentItem.module.css";
import { Button, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";

type Props = {
  item: TFilament;
  onEdit: (id: string) => void;
};

export const FilamentItem: FC<Props> = ({ item, onEdit }) => {
  const onStockChange = () => {
    filamentsFxs.updateFx({ ...item, inStock: !item.inStock });
  };

  return (
    <div className={styles.item}>
      <div className={styles.top}>
        <div className={styles.texts}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.subtitle}>#{item.code}</div>
        </div>
        <div
          className={styles.marker}
          style={{ backgroundColor: item.color }}
        />
      </div>
      <div className={styles.bottom}>
        <div className={styles.inStock}>
          В наличии{" "}
          <Switch
            onChange={onStockChange}
            checked={item.inStock}
            size="small"
          />
        </div>
        <Button
          onClick={() => onEdit(item.id)}
          icon={<EditOutlined />}
          size="small"
        />
      </div>
    </div>
  );
};
