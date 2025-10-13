import { Button, Card, Input, Upload } from "antd";
import { withLayout } from "../../hocs/withLayout";
import styles from "./Utils.module.css";
import { useState } from "react";
import { useUnit } from "effector-react";
import { $notExistCards, checkNotExistCardsFx } from "./store";
export const Utils = withLayout(() => {
  const [cards, setCards] = useState("");
  const notExistCards = useUnit($notExistCards);

  const handleCheckNotExist = () => {
    checkNotExistCardsFx(cards);
  };

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

      <Card hoverable>
        <Card.Meta
          title="Проверка карт на наличие"
          description="Дополнение,Номер,Вариант"
        />
        <div className={styles.actions}>
          <Input.TextArea
            value={cards}
            onChange={(e) => setCards(e.target.value)}
          />
          <Input.TextArea value={notExistCards} />
        </div>
        <Button onClick={handleCheckNotExist}>Сверить</Button>
      </Card>
      <Card hoverable>
        <Card.Meta
          title="Фильтрация карт по наличию"
          description="Поддерживает .csv файл"
        />
        <div className={styles.actions}>
          <Upload
            headers={{ token: localStorage.getItem("token") || "" }}
            name="need"
            action="/api/utils/cardsForSale"
          >
            <Button>Загрузить</Button>
          </Upload>

          <Button href="/api/utils/cardsForSale.csv" download>
            Скачать результат
          </Button>
        </div>
      </Card>
    </div>
  );
});
