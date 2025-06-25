import {
  Checkbox,
  Dropdown,
  Input,
  Popover,
  Switch,
  Tooltip,
  type MenuProps,
} from "antd";
import styles from "./Item.module.css";
import {
  $items,
  changeItem,
  deleteItem,
  setCardPosition,
  swapCards,
  transferItem,
  type TItem,
} from "../../store";
import {
  MenuOutlined,
  PictureOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useUnit } from "effector-react";
import { useEffect, useMemo, useState } from "react";

type ItemProps = {
  item: TItem;
  page: string;
  index: number;
};

export const Item = ({ item, page, index }: ItemProps) => {
  const items = useUnit($items);
  const [position, setPosition] = useState(index);
  const onChange =
    (field: keyof TItem) => (e: React.ChangeEvent<HTMLInputElement>) => {
      changeItem({ field, page, id: item.id, value: e.target.value });
    };

  const onSoldChange = () => {
    changeItem({ field: "sold", page, id: item.id, value: !item.sold });
  };

  const onIsNewChange = () => {
    changeItem({ field: "isNew", page, id: item.id, value: !item.isNew });
  };

  const onIsReservedChange = () => {
    changeItem({
      field: "isReserved",
      page,
      id: item.id,
      value: !item.isReserved,
    });
  };

  const handleChangePosition = () => {
    if (position !== index) {
      setCardPosition({
        id: item.id,
        page: page,
        position: position,
      });
    }
  };

  useEffect(() => {
    setPosition(index);
  }, [index]);

  const sameCardError = useMemo(() => {
    const findedPage = items.findIndex((p) => {
      if (p.id === page) return false;
      return p.cards.some(
        (i) =>
          `${item.expansion}-${item.number}` === `${i.expansion}-${i.number}`
      );
    });
    if (findedPage === -1) return false;
    return `Эта карта уже есть на странице ${findedPage}`;
  }, [items]);

  const menuItems: MenuProps["items"] = [
    {
      key: "2",
      label: "Удалить",
      danger: true,
      onClick: () => {
        deleteItem({ page, id: item.id });
      },
    },
  ];

  return (
    <div className={styles.item}>
      <div>
        <MenuOutlined />
      </div>
      <div className={styles.col}>
        <div className={styles.itemRow}>
          <Tooltip title={item.count >= 1 ? "" : "Таких карт не осталось"}>
            <Input
              className={styles.itemCount}
              value={item.count}
              status={item.count < 1 ? "error" : ""}
              disabled
              placeholder={"Количество"}
            />
          </Tooltip>
          <Input
            className={styles.itemNumber}
            value={item.number}
            disabled
            placeholder={"Номер"}
          />

          <Input placeholder={"Доп"} disabled value={item.expansion} />
          <Input
            className={styles.itemPrice}
            placeholder={"Цена"}
            onChange={onChange("price")}
            value={item.price}
          />
        </div>
        <div className={styles.itemRow}>
          <Input
            className={styles.itemDescription}
            value={item.description}
            onChange={onChange("description")}
            placeholder={"Описание"}
          />
          <Input
            className={styles.itemRarity}
            value={item.rarity}
            onChange={onChange("rarity")}
            placeholder={"Редкость"}
          />
        </div>
        <div className={styles.itemRow}>
          <div className={styles.switchItem}>
            <div>Продано</div>
            <Switch checked={item.sold} onChange={onSoldChange} />
          </div>
          <div className={styles.switchItem}>
            <div>Новая</div>
            <Switch checked={item.isNew} onChange={onIsNewChange} />
          </div>
          <div className={styles.switchItem}>
            <div>Резерв</div>
            <Switch checked={item.isReserved} onChange={onIsReservedChange} />
          </div>
          <div style={{ flexGrow: 1 }} />
          {sameCardError && (
            <Tooltip title={sameCardError}>
              <WarningOutlined style={{ color: "red" }} />
            </Tooltip>
          )}
          <Popover
            content={<img className={styles.cardImage} src={item.image} />}
          >
            <PictureOutlined style={{ fontSize: 20, marginRight: 8 }} />
          </Popover>
          <Dropdown menu={{ items: menuItems }}>
            <MenuOutlined style={{ fontSize: 20 }} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
