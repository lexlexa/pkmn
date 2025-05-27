import { Button, Card, Upload } from "antd";
import { withLayout } from "../../hocs/withLayout";
import styles from "./Utils.module.css";
export const Utils = withLayout(() => {
  return (
    <div className={styles.container}>
      <Card hoverable>
        <Card.Meta
          title="Фильтрация нужных нам карт"
          description="Поддерживает .csv файл из 'Карты Нужны'"
        />
        <div className={styles.actions}>
          <Upload
            headers={{ token: localStorage.getItem("token") || "" }}
            name="need"
            action="/api/utils/cardsNeed"
          >
            <Button>Загрузить</Button>
          </Upload>

          <Button href="/api/utils/cardsNeed.csv" download>
            Скачать результат
          </Button>
        </div>
      </Card>

      <Card hoverable>
        <Card.Meta
          title="Обновление цен"
          description="Поддерживает .csv файл"
        />
        <div className={styles.actions}>
          <Upload
            headers={{ token: localStorage.getItem("token") || "" }}
            name="prices"
            action="/api/utils/prices"
          >
            <Button>Загрузить</Button>
          </Upload>
          <Button href="/api/utils/prices.csv" download>
            Скачать результат
          </Button>
        </div>
      </Card>
    </div>
  );
});
