import { useUnit } from "effector-react";
import { $rareSaleCards } from "../../store";
import styles from "./RareCardsContent.module.css";
import { useEffect, useRef } from "react";

export const RareCardsContent = () => {
  const list = useUnit($rareSaleCards);

  const contentRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRef.current = contentRef.current.slice(0, list.length);
  }, [list]);

  return (
    <div className={styles.container}>
      {list.map((exp) => {
        if (exp.cards.every((c) => c.isHidden)) return null;
        return (
          <div key={exp.expansion} className={styles.exp}>
            <div className={styles.expTitle}>{exp.expansion}</div>
            <div className={styles.list}>
              {exp.cards.map((card) => {
                if (card.isHidden) return null;
                return (
                  <div key={card.number} className={styles.card}>
                    {card.isRented ? (
                      <div className={styles.rent}>Забронирована</div>
                    ) : null}
                    <div className={styles.cardTitle}>
                      {card.number} {card.name}
                    </div>
                    <div className={styles.price}>{card.price}</div>
                    <img
                      src={`/api/image-proxy?url=${encodeURIComponent(
                        card.image
                      )}`}
                      className={styles.cardImage}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
