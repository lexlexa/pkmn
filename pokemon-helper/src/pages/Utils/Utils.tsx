import { Button, Upload } from "antd";
import { withLayout } from "../../hocs/withLayout";

export const Utils = withLayout(() => {
  return (
    <div>
      <div>
        <div>Фильтрация нужных нам карт. </div>
        <div>
          Формат csv файла: ,Set,Название,Номер карты,Тип,Тип (для
          скрипта),Комментарий
        </div>
        <Upload name="need" action="/api/utils/cardsNeed">
          <Button>Загрузить</Button>
        </Upload>
        <Button href="/api/utils/cardsNeed.csv" download>
          Загрузить результат
        </Button>
      </div>

      <div>
        <div>Обновление цен. </div>
        <Upload name="prices" action="/api/utils/prices">
          <Button>Загрузить</Button>
        </Upload>
        <Button href="/api/utils/prices.csv" download>
          Загрузить результат
        </Button>
      </div>
    </div>
  );
});
