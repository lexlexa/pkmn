import { useUnit } from "effector-react";
import { RareCardItem } from "../RareCardItem/RareCardItem";
import styles from "./RareCardsList.module.css";
import {
  $rareSaleCards,
  changeExpansion,
  saveSaleRare,
  type TRareSaleCards,
} from "../../store";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Button, Select } from "antd";

export const RareCardsList = () => {
  const list = useUnit($rareSaleCards);
  const [filter, setFilter] = useState<"all" | "no_prices" | "hidden">("all");
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleHide = (expansion: TRareSaleCards) => {
    changeExpansion({ ...expansion, isHidden: true });
  };

  const handleShow = (expansion: TRareSaleCards) => {
    changeExpansion({ ...expansion, isHidden: false });
  };

  const handleToogleExpand = (exp: string) => {
    if (expanded.includes(exp)) {
      setExpanded(expanded.filter((item) => item !== exp));
    } else {
      setExpanded([...expanded, exp]);
    }
  };

  const options = [
    { label: "Все", value: "all" },
    // { label: "Без цен", value: "no_prices" },
    { label: "Скрытые", value: "hidden" },
  ];

  const handleChange = (value: "all" | "no_prices" | "hidden") => {
    setFilter(value);
  };

  const filteredList = list.reduce((acc, curr) => {
    if (filter === "hidden") {
      if (curr.isHidden) return [...acc, curr];
      const cards = curr.cards.filter((card) => card.isHidden);
      if (cards.length > 0) {
        return [...acc, { ...curr, cards }];
      }
      return acc;
    }

    if (filter === "no_prices") {
      const cards = curr.cards.filter((card) => !card.price);
      if (cards.length > 0) {
        return [...acc, { ...curr, cards }];
      }
      return acc;
    }
    return [...acc, curr];
  }, [] as TRareSaleCards[]);
  // const filteredList = list
  //   .filter((item) => {
  //     if (filter === "hidden") return item.isHidden;
  //     return true;
  //   })
  //   .map((item) => ({
  //     ...item,
  //     cards: item.cards.filter((card) => {
  //       if (filter === "hidden") return card.isHidden;
  //       if (filter === "no_prices") return !card.price;
  //       return true;
  //     }),
  //   }));
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div>
          <Button
            color="cyan"
            variant="outlined"
            style={{ width: "100%" }}
            onClick={() => saveSaleRare()}
          >
            Сохранить
          </Button>
        </div>
        <div>
          <Select
            style={{ width: "100%" }}
            value={filter}
            options={options}
            onChange={handleChange}
          />
        </div>
      </div>
      {filteredList.map((exp) => (
        <div key={exp.expansion} className={styles.expansion}>
          <div className={styles.title}>
            <div className={styles.titleText}>
              {exp.expansion} ({exp.cards.length})
            </div>
            {exp.isHidden ? (
              <EyeOutlined onClick={() => handleShow(exp)} />
            ) : (
              <EyeInvisibleOutlined onClick={() => handleHide(exp)} />
            )}
            {expanded.includes(exp.expansion) ? (
              <CaretDownOutlined
                onClick={() => handleToogleExpand(exp.expansion)}
              />
            ) : (
              <CaretUpOutlined
                onClick={() => handleToogleExpand(exp.expansion)}
              />
            )}
          </div>
          {expanded.includes(exp.expansion) ? null : (
            <div className={styles.list}>
              {exp.cards.map((item) => (
                <RareCardItem key={item.number} item={item} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
