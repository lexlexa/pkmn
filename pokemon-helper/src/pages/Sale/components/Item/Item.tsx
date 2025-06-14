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
  transferItem,
  type TItem,
} from "../../store";
import { MenuOutlined, PictureOutlined } from "@ant-design/icons";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";

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
