import { withLayout } from "../../hocs/withLayout";
import styles from "./Sale.module.css";
import { Button, Input } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useUnit } from "effector-react";
import {
  $items,
  $saleCards,
  addItem,
  changeItem,
  deleteItem,
  getSaleCardsFx,
  getSaleFx,
  saveSaleFx,
} from "./store";
import { useEffect } from "react";

export const Sale = withLayout(
  () => {
    const items = useUnit($items);
    const cards = useUnit($saleCards);

    useEffect(() => {
      getSaleFx();
      getSaleCardsFx();
    }, []);

    const handleChangeValue =
      (field: "number" | "expansion" | "price", index: number) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        changeItem({ field, index, value: e.target.value });
      };

    const handleDeleteItem = (index: number) => () => {
      deleteItem(index);
    };

    const handleAddItem = () => addItem();

    const handleSave = () => {
      saveSaleFx(items);
    };

    return (
      <div className={styles.container}>
        <div className={styles.aside}>
          {items.map((item, index) => (
            <div key={item.id} className={styles.item}>
              <Input
                className={styles.itemNumber}
                value={item.number}
                onChange={handleChangeValue("number", index)}
                placeholder={"Номер"}
              />
              <Input
                placeholder={"Доп"}
                onChange={handleChangeValue("expansion", index)}
                value={item.expansion}
              />
              <Input
                className={styles.itemPrice}
                placeholder={"Цена"}
                onChange={handleChangeValue("price", index)}
                value={item.price}
              />
              <Button
                className={styles.itemButton}
                icon={<DeleteOutlined />}
                color="danger"
                variant="outlined"
                onClick={handleDeleteItem(index)}
              ></Button>
            </div>
          ))}

          <Button icon={<PlusOutlined />} onClick={handleAddItem}>
            Добавить
          </Button>
          <div className={styles.actions}>
            <Button color="primary" onClick={handleSave} variant="filled">
              Сохранить
            </Button>
            <Button color="primary" variant="filled">
              Сформировать
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.saleContent}>
            {cards.map((item) => {
              return (
                <div>
                  <img src={item.image} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
  { noPadding: true }
);
