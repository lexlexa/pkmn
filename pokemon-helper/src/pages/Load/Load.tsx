import { useEffect } from "react";
import { withLayout } from "../../hocs/withLayout";
import { $duplicatesButtons, loadDuplicatesButtonsFx } from "./store";
import { useUnit } from "effector-react";
import { Button, Typography } from "antd";
import styles from "./Load.module.css";
export const Load = withLayout(() => {
  const buttons = useUnit($duplicatesButtons);

  useEffect(() => {
    loadDuplicatesButtonsFx();
  }, []);

  return (
    <div className={styles.container}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Дубликаты
      </Typography.Title>
      <div className={styles.buttons}>
        {buttons.map((item) => (
          <Button
            href={`/api/duplicates/csv?q=${encodeURI(
              item.name.replace("&", "and")
            )}`}
            size="small"
            download
          >
            {item.name} {item.count}
          </Button>
        ))}
      </div>
    </div>
  );
});
