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
import { Button } from "antd";

export const RareCardsList = () => {
  const list = useUnit($rareSaleCards);
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

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Button onClick={() => saveSaleRare()}>Сохранить</Button>
      </div>
      {list.map((exp) => (
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
