import type { FC } from "react";
import styles from "./FilamentItem.module.css";
import { Button, Switch } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { filamentsFxs, type TFilament } from "../../../../store/filaments";

type Props = {
    item: TFilament;
    onEdit: (id: number) => void;
};

export const FilamentItem: FC<Props> = ({ item, onEdit }) => {
    const onStockChange = () => {
        filamentsFxs.updateFx({ ...item, in_stock: !item.in_stock });
    };

    return (
        <div className={styles.item}>
            <div className={styles.top}>
                <div className={styles.texts}>
                    <div className={styles.title}>{item.name}</div>
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
                        checked={item.in_stock}
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
