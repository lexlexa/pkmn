import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Select } from "antd";
import { useUnit } from "effector-react";
import { $dicts } from "../../../store";
import styles from "./AddCardButton.module.css";
import { useState } from "react";
import { ApiInstance } from "../../../../helpers/api";
import { addItem, type TItem } from "../../store";

type AddCardButtonProps = {
  page: string;
};

export const AddCardButton = ({ page }: AddCardButtonProps) => {
  const dicts = useUnit($dicts);

  const [exp, setExp] = useState("");
  const [number, setNumber] = useState("");

  const handleAdd = async () => {
    const response = await ApiInstance.get(
      `/api/card/find?exp=${exp}&number=${number}`
    );

    if (response.status !== 200) return;

    addItem({
      item: response.data as Omit<TItem, "id" | "page">,
      page: page,
    });
  };

  return (
    <Popover
      content={
        <div className={styles.container}>
          <Select
            value={exp}
            onChange={setExp}
            showSearch
            optionFilterProp="label"
            size="small"
            className={styles.exp}
            placeholder="Дополнение"
            options={dicts.expansions.map((item) => ({
              value: item.slug,
              label: item.name,
            }))}
          />
          <Input
            value={number}
            className={styles.number}
            size="small"
            placeholder="№"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <Button onClick={handleAdd} size="small" variant="solid" color="blue">
            Ok
          </Button>
        </div>
      }
      trigger={"click"}
    >
      <Button variant="dashed" block color={"cyan"} icon={<PlusOutlined />}>
        Добавить карту
      </Button>
    </Popover>
  );
};
