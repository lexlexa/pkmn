import { useUnit } from "effector-react";
import { $rareSaleCards } from "../../store";
import styles from "./RareCardsContent.module.css";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { Button } from "antd";

export const RareCardsContent = () => {
  const list = useUnit($rareSaleCards);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current, {
        allowTaint: true,
        logging: true,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `items.png`;
      link.click();
    }
  };

  return (
    <>
      <Button
        onClick={handleDownload}
        style={{ position: "fixed", bottom: 8, right: 8, zIndex: 10 }}
      >
        Скачать
      </Button>
      <div ref={contentRef} className={styles.container}>
        {list.map((exp) => {
          if (exp.isHidden) return null;
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
    </>
  );
};
