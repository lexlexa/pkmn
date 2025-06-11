import { useUnit } from "effector-react";
import { $selectedPage, type TItem } from "../../store";
import { Themes } from "../../theme";
import styles from "./Card.module.css";

type CardProps = {
  item: TItem;
};

export const Card = ({ item }: CardProps) => {
  const selectedPage = useUnit($selectedPage);
  const theme = Themes[selectedPage.theme];

  return (
    <div
      style={{
        background: theme.cardBackground,
        // filter: item.sold ? "opacity(0.3)" : "",
      }}
      className={styles.card}
    >
      {item.sold && <div className={styles.sold}>Продано</div>}
      <div
        style={{ background: theme.headerBackground }}
        className={styles.cardHeader}
      >
        <div
          style={{ background: theme.headerFillBackground }}
          className={styles.cardHeaderFill}
        ></div>
        <div
          style={{ background: theme.headerFillBackground }}
          className={styles.cardHeaderFill}
        ></div>
      </div>
      <div className={styles.headerTexts}>
        <div>{item.description}</div>
        <div>{item.rarity}</div>
      </div>
      <img
        className={styles.image}
        style={{ filter: item.sold ? "opacity(0.3)" : "" }}
        src={item.image}
      />
      <div
        style={{ background: theme.priceBackground }}
        className={styles.cardPrice}
      ></div>
      <div className={styles.priceText}>{item.price}р.</div>
    </div>
  );
};
