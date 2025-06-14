import {
  Checkbox,
  Dropdown,
  Input,
  Popover,
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
      console.log(field, page, item.id, e.target.value);
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
      console.log(position);
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
      key: "1",
      label: "Перенести в",
      children: items.map((i, index) => ({
        key: i.id,
        disabled: i.id === page,
        label: `Страница ${index}`,
        onClick: () => {
          transferItem({ fromPage: page, toPage: i.id, id: item.id });
        },
      })),
    },
    {
      key: "3",
      label: "Поменять местами с",
      children: items.map((i1, index) => ({
        key: i1.id,
        label: `Страница ${index}`,
        children: i1.cards.map((i2) => ({
          key: i2.id,
          disabled: i2.id === item.id,
          label: i2.description,
          onClick: () => {
            swapCards({ cardToId: i2.id, cardFromId: item.id });
          },
        })),
      })),
    },
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
        <Input
          className={styles.itemPosition}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          onBlur={handleChangePosition}
          placeholder={"Позиция"}
        />
      </div>
      <div className={styles.itemRow}>
        <Checkbox checked={item.sold} onChange={onSoldChange}>
          Продано
        </Checkbox>
        <Checkbox checked={item.isNew} onChange={onIsNewChange}>
          Новая
        </Checkbox>
        <Checkbox checked={item.isReserved} onChange={onIsReservedChange}>
          Резерв
        </Checkbox>
        <div style={{ flexGrow: 1 }} />
        {sameCardError && (
          <Tooltip title={sameCardError}>
            <WarningOutlined style={{ color: "red" }} />
          </Tooltip>
        )}
        <Dropdown menu={{ items: menuItems }}>
          <MenuOutlined />
        </Dropdown>
        <Popover
          content={<img className={styles.cardImage} src={item.image} />}
        >
          <PictureOutlined />
        </Popover>
      </div>
    </div>
  );
};
