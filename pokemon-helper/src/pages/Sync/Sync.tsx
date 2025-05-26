import { withLayout } from "../../hocs/withLayout";
import { Button, Upload } from "antd";
import styles from "./Sync.module.css";

export const Sync = withLayout(() => {
  return (
    <div className={styles.container}>
      <div className={styles.loaders}>
        <Upload
          headers={{ token: localStorage.getItem("token") || "" }}
          name="first"
          action="/api/sync/first"
        >
          <div>
            <Button>Первый файл</Button>
          </div>
        </Upload>

        <Upload
          headers={{ token: localStorage.getItem("token") || "" }}
          name="second"
          action="/api/sync/second"
        >
          <div>
            <Button>Второй файл</Button>
          </div>
        </Upload>
      </div>
    </div>
  );
});
