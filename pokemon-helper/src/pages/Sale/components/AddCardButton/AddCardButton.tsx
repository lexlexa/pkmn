import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Select } from "antd";
import { useUnit } from "effector-react";
import { $dicts } from "../../../store";
import styles from "./AddCardButton.module.css";
import { useState } from "react";
import { ApiInstance } from "../../../../helpers/api";
import {
  $items,
  $suggestions,
  addItem,
  loadSuggestionsFx,
  type TItem,
} from "../../store";

type AddCardButtonProps = {
  page: string;
};

export const AddCardButton = ({ page }: AddCardButtonProps) => {
  const dicts = useUnit($dicts);
  const pages = useUnit($items);
  const suggestions = useUnit($suggestions);
  const [expansion, setExpansion] = useState<string | null>(null);
  const [exp, setExp] = useState("");
  const [number, setNumber] = useState("");

  const handleAdd = async () => {
    addItemByData(exp, number);
  };

  const addItemByData = async (expansion: string, num: string) => {
    const response = await ApiInstance.get(
      `/api/card/find?exp=${expansion}&number=${num}`
    );

    if (response.status !== 200) return;

    addItem({
      item: response.data as Omit<TItem, "id" | "page">,
      page: page,
    });
  };

  const onChangeExpansion = (value: string | undefined) => {
    setExpansion(value || null);
  };

  const filteredSuggestions = expansion
    ? suggestions.filter((item) => item.expansion === expansion)
    : suggestions;

  return (
    <Popover
      onOpenChange={() => {
        loadSuggestionsFx(pages);
      }}
      content={
        <div className={styles.content}>
          <div className={styles.item}>
            <Select
              placeholder="Все дополнения"
              allowClear
              style={{ width: "100%" }}
              onChange={onChangeExpansion}
              value={expansion}
              options={[
                ...new Set(suggestions.map((item) => item.expansion)),
              ].map((key) => ({ value: key, label: key }))}
            />
          </div>
          <div className={styles.container}>
            {filteredSuggestions.map((item) => {
              return (
                <div className={styles.item}>
                  <div className={styles.title}>{item.expansion}</div>
                  <div className={styles.number}>{item.number}</div>
                  <div>
                    <Button
                      size="small"
                      color="green"
                      variant="solid"
                      onClick={() => addItemByData(item.slug, item.number)}
                      icon={<PlusOutlined />}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.item}>
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
            <Button
              onClick={handleAdd}
              size="small"
              variant="solid"
              color="blue"
            >
              Ok
            </Button>
          </div>
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
