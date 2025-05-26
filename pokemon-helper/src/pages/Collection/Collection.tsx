import { Select } from "antd";
import { withLayout } from "../../hocs/withLayout";
import styles from "./Collection.module.css";

export const Collection = withLayout(() => {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Select placeholder="Дополнение" />
        <Select placeholder="Редкость" />
      </div>
      <div className={styles.content}>123</div>
    </div>
  );
});
