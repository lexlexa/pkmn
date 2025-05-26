import { withLayout } from "../../hocs/withLayout";
import { Button, Upload } from "antd";
import styles from "./Sync.module.css";

export const Sync = withLayout(() => {
  return (
    <div className={styles.container}>
      <div className={styles.loaders}>
        <Upload.Dragger>
          <div>
            <div>Первый файл</div>
          </div>
        </Upload.Dragger>

        <Upload.Dragger>
          <div>
            <div>Второй файл</div>
          </div>
        </Upload.Dragger>
      </div>
      <div className={styles.buttons}>
        <Button size="large">Загрузить</Button>
      </div>
    </div>
  );
});
