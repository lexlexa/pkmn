import { Button, Drawer, Input, Select, Upload } from "antd";
import styles from "./PokeballForm.module.css";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { generateUUID } from "../../../Sale/helpers";
export const PokeballForm = () => {
  const [files, setFiles] = useState([]);

  // const onChange = (e) => {
  //   console.log(e);
  // };
  generateUUID;

  return (
    <Drawer open>
      <div className={styles.form}>
        <h3>Основная информация</h3>
        <Input value="" placeholder="Название" />
        <Input value="" placeholder="Номер" />
        <Select placeholder="Тэги" />
        <div className={styles.filamentList}>
          <h3>Филамент</h3>
          <div className={styles.filamentItem}>
            <Select placeholder="Выберите значение" />
            <Input placeholder="Количество" />
            <Button icon={<DeleteOutlined />} block />
          </div>
          <div className={styles.filamentItem}>
            <Button block>Добавить</Button>
          </div>
        </div>
        <div>
          <h3>Изображения</h3>
          <Upload
            action={"https://localhost:3001/api/images"}
            method="POST"
            listType="picture"
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Загрузить изображения
            </Button>
          </Upload>
        </div>
      </div>
    </Drawer>
  );
};
