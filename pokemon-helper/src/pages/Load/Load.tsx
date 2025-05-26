import { useEffect } from "react";
import { withLayout } from "../../hocs/withLayout";
import { $duplicatesButtons, loadDuplicatesButtonsFx } from "./store";
import { useUnit } from "effector-react";
import { Button } from "antd";
import styles from "./Load.module.css";
export const Load = withLayout(() => {
  const buttons = useUnit($duplicatesButtons);

  useEffect(() => {
    loadDuplicatesButtonsFx();
  }, []);

  return (
    <div className={styles.container}>
      {buttons.map((item) => (
        <Button
          href={`http://localhost:3000/api/duplicates/csv?q=${encodeURI(
            item.name.replace("&", "and")
          )}`}
          download
        >
          {item.name} {item.count}
        </Button>
      ))}
    </div>
  );
});
