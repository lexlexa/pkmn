import { useUnit } from "effector-react";
import { $selectedPage, type TItem } from "../../store";
import { Themes } from "../../theme";
import styles from "./Card.module.css";

type CardProps = {
  item: TItem;
};

export const Card = ({ item }: CardProps) => {
  const selectedPage = useUnit($selectedPage);
  const theme = Themes[item.theme || selectedPage.theme];
  return (
    <div
      style={{
        background: theme.cardBackground,
      }}
      className={styles.card}
    >
      {item.sold && !item.isReserved && (
        <div className={styles.sold}>Продано</div>
      )}
      {item.isReserved && <div className={styles.sold}>Бронь</div>}
      {item.isNew && <div className={styles.new}>NEW</div>}
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
        style={{ opacity: item.sold ? "0.6" : "" }}
        src={`/api/image-proxy?url=${encodeURIComponent(item.image)}`}
      />
      <div
        style={{ background: theme.priceBackground }}
        className={styles.cardPrice}
      ></div>
      <div style={{ color: theme.priceColor }} className={styles.priceText}>
        {item.price}р.
      </div>
    </div>
  );
};
