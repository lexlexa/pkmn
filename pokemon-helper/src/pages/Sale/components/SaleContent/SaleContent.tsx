import { useUnit } from "effector-react";
import { Themes } from "../../theme";
import styles from "./SaleContent.module.css";
import { $selectedPage } from "../../store";
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
          padding:
            selectedPage.cards.length === 4 ? "115px 300px" : "115px 261px",
        }}
        ref={contentRef}
        className={styles.saleContent}
      >
        {selectedPage?.cards.slice(0, 6).map((item) => {
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};
