import { useUnit } from "effector-react";
import { Themes } from "../../theme";
import styles from "./SaleContent.module.css";
import { $selectedPage, SalesPageSizes } from "../../store";
import { Card } from "../Card/Card";
import { useRef } from "react";
import { Button } from "antd";
import html2canvas from "html2canvas";

export const SaleContent = () => {
  const selectedPage = useUnit($selectedPage);
  const theme = Themes[selectedPage.theme];
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

  const [x, y] = SalesPageSizes[selectedPage.size || "2x3"];
  const maxCards = x * y;

  const cardsSize = maxCards > 8 ? "small" : "default";

  const getPadding = () => {
    const count = selectedPage.cards.length;
    const maxCount = maxCards;

    if (count === 4) return "115px 300px";
    if (maxCount <= 6) return "115px 150px";
    return "";
  };

  return (
    <>
      <Button
        style={{ position: "fixed", bottom: "8px", right: "90px" }}
        onClick={handleDownload}
      >
        Скачать как изображение
      </Button>
      <div
        style={{
          background: theme.background,
          padding: getPadding(),
          gap: cardsSize === "small" ? "0px" : "",

          // selectedPage.cards.length === 4 ? "115px 300px" : "115px 261px",
        }}
        ref={contentRef}
        className={styles.saleContent}
      >
        {selectedPage?.cards.slice(0, maxCards).map((item) => {
          return <Card size={cardsSize} key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};
