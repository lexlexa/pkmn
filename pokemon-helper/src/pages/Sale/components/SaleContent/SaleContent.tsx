import { useUnit } from "effector-react";
import { Themes } from "../../theme";
import styles from "./SaleContent.module.css";
import { $selectedPage } from "../../store";
import { Card } from "../Card/Card";

export const SaleContent = () => {
  const selectedPage = useUnit($selectedPage);
  const theme = Themes[selectedPage.theme];
  return (
    <div
      style={{
        background: theme.background,
        padding:
          selectedPage.cards.length === 4 ? "115px 300px" : "115px 261px",
      }}
      className={styles.saleContent}
    >
      {selectedPage?.cards.slice(0, 6).map((item) => {
        return <Card key={item.id} item={item} />;
      })}
    </div>
  );
};
