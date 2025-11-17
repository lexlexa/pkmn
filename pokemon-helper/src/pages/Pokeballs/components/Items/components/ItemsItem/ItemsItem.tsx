import type { FC } from "react";
import styles from "./ItemsItem.module.css";
import { Button, Flex } from "antd";
import { EditOutlined } from "@ant-design/icons";
import type { TItem } from "../../../../store/items";

type Props = {
    item: TItem;
    onEdit: (id: number) => void;
};

export const ItemsItem: FC<Props> = ({ item, onEdit }) => {
    return (
        <div className={styles.item}>
            <div className={styles.header}>
                <div style={{ flexGrow: 1 }}>{item.name}</div>
                <Button
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(item.id)}
                />
            </div>
            <div className={styles.images}>
                {item.items_images.map((item, index) => (
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: index > 0 ? "none" : "",
                            borderRadius: 16
                        }}
                        src={`/api/images?name=${item.image_id}`}
                    />
                ))}
            </div>
            <Flex className={styles.price} justify="flex-end">
                {item.price}р.
            </Flex>
        </div>
    );
};
