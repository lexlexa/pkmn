import { IconByRare, type CardRarities } from "../../constants";
import styles from "./RarityWithIcon.module.css";
type TProps = {
  rarity: CardRarities;
  children?: React.ReactNode;
};

export const RarityWithIcon = ({ rarity, children }: TProps) => {
  return (
    <div className={styles.text}>
      <img className={styles.img} src={IconByRare[rarity]} />
      {children}
    </div>
  );
};
