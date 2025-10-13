import type { FC } from "react";
import type { TPokeball } from "../../store";
import styles from "./PokeballItem.module.css";

type Props = {
  item: TPokeball;
};

export const PokeballItem: FC<Props> = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div className={styles.index}>#{item.pokedexIndex}</div>
        <div>{item.name}</div>
      </div>
      <div className={styles.images}>images</div>
      <div className={styles.tags}>
        {item.tags.map((item) => (
          <div className={styles.tag}>{item}</div>
        ))}
      </div>
      <div>filament</div>
    </div>
  );
};
