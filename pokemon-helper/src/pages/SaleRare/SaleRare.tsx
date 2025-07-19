import { useEffect } from "react";
import { withLayout } from "../../hocs/withLayout";
import { RareCardsList } from "./components/RareCardsList/RareCardsList";
import styles from "./SaleRare.module.css";
import { loadSaleRareCardsFx } from "./store";
import { RareCardsContent } from "./components/RareCardsContent/RareCardsContent";

export const SaleRare = withLayout(() => {
  useEffect(() => {
    loadSaleRareCardsFx();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.aside}>
        <RareCardsList />
      </div>
      <div className={styles.content}>
        <RareCardsContent />
      </div>
    </div>
  );
});
