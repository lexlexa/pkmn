import { withLayout } from "../../hocs/withLayout";
import { Upload } from "antd";
import styles from "./Sync.module.css";

export const Sync = withLayout(() => {
  return (
    <div className={styles.container}>
      <div>Загрузка файлов для обновления коллекции</div>
      <div>Поддерживаются файлы .csv из tcgcollector</div>
      <div className={styles.loaders}>
        <Upload.Dragger
          headers={{ token: localStorage.getItem("token") || "" }}
          name="first"
          action="/api/sync/first"
          style={{ height: 100 }}
        >
          <div>Первый файл</div>
        </Upload.Dragger>

        <Upload.Dragger
          headers={{ token: localStorage.getItem("token") || "" }}
          name="second"
          action="/api/sync/second"
        >
          <div>Второй файл</div>
        </Upload.Dragger>
      </div>
    </div>
  );
});
