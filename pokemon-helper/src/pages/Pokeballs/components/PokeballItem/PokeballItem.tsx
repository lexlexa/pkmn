import type { FC } from "react";
import type { TPokeball } from "../../store";
import styles from "./PokeballItem.module.css";
import { Button, Flex } from "antd";
import { EditOutlined } from "@ant-design/icons";

type Props = {
  item: TPokeball;
  onEdit: (id: string) => void;
};

export const PokeballItem: FC<Props> = ({ item, onEdit }) => {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div className={styles.index}>
          #{item.pokedexIndex.padStart(4, "0")}
        </div>
        <div style={{ flexGrow: 1 }}>{item.name}</div>
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={() => onEdit(item.id)}
        />
      </div>
      <div className={styles.images}>
        {item.images.map((item, index) => (
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: index > 0 ? "none" : "",
            }}
            src={`/api/images?name=${item}`}
          />
        ))}
      </div>
      <Flex className={styles.price} justify="flex-end">
        {item.price}р.
      </Flex>
    </div>
  );
};
