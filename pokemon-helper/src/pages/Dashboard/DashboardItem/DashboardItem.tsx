import styles from "./DashboardItem.module.css";
import sv10 from "../../../assets/destined-rivals-banner.png";
import sv9 from "../../../assets/journey-together-banner.png";
import sv8pt5 from "../../../assets/prismatic-evolutions-banner.avif";
import sv8 from "../../../assets/surgings-sparks-banner.png";
import sv7 from "../../../assets/stellar-crown-banner.png";
import sv6pt5 from "../../../assets/shrouded-fable-banner.avif";
import sv6 from "../../../assets/twilight-masquerade-banner.png";
import sv5 from "../../../assets/temporal-forces-banner.png";
import sv4pt5 from "../../../assets/paldean-fates-banner.png";
import sv4 from "../../../assets/paradox-rift-banner.png";
import sv3pt5 from "../../../assets/151-banner.png";
import sv3 from "../../../assets/obsidian-flames-banner.png";
import sv2 from "../../../assets/paldea-evolved-banner.png";
import sv1 from "../../../assets/scarlet-violet-banner.jpg";

const ImageBySlug = {
  sv10,
  sv9,
  sv8pt5,
  sv8,
  sv7,
  sv6pt5,
  sv6,
  sv5,
  sv4pt5,
  sv4,
  sv3pt5,
  sv3,
  sv2,
  sv1,
};

type TProps = {
  slug: string;
  all: { count: number; max: number };
  normal: { count: number; max: number };
  reverse: { count: number; max: number };
  normalHolo: { count: number; max: number };
};

export const DashBoardItem = ({
  all,
  normal,
  reverse,
  normalHolo,
  slug,
}: TProps) => {
  const precentCompleted = Math.floor((all.count / all.max) * 100);

  const order = [
    { name: "Normal", item: normal },
    { name: "Reverse Holo", item: reverse },
    { name: "Normal Holo", item: normalHolo },
  ];

  return (
    <div className={styles.card}>
      <img
        className={styles.img}
        src={ImageBySlug[slug as keyof typeof ImageBySlug]}
      />
      <div
        className={styles.imageContainer}
        style={{
          backgroundImage: `url(${`https://images.pokemontcg.io/${slug}/logo.png`})`,
        }}
      >
        <div className={styles.percent}>{precentCompleted}%</div>
      </div>
      <div className={styles.statistics}>
        {order.map(({ name, item }) => {
          const percent = Math.floor((item.count / item.max) * 100);
          return (
            <div className={styles.statisticsItem}>
              <div className={styles.statisticsTitle}>{name}</div>
              <div className={styles.statisticsProgress}>
                <div
                  className={`${styles.statisticsProgressInner} ${
                    item.count === item.max ? styles.full : ""
                  }`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <div className={styles.statisticsCount}>
                {item.count}/{item.max}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
