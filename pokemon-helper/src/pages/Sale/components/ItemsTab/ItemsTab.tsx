import { setPageTheme, type TPage } from "../../store";
import { Item } from "../Item/Item";
import { AddCardButton } from "../AddCardButton/AddCardButton";
import styles from "./ItemsTab.module.css";
import { Select } from "antd";
import { Themes } from "../../theme";

type ItemsTabProps = {
  tab: TPage;
};

export const ItemsTab = ({ tab }: ItemsTabProps) => {
  const handleChaneTheme = (theme: string) => {
    setPageTheme({ page: tab.id, theme: theme as keyof typeof Themes });
  };

  return (
    <div className={styles.container}>
      <div>
        <div>Настройка страницы</div>
        <Select
          onChange={handleChaneTheme}
          value={tab.theme || "GOLD"}
          style={{ width: "100%" }}
          options={Object.keys(Themes).map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>
      {tab.cards.map((item, index) => (
        <Item key={`${item.id}`} index={index} page={tab.id} item={item} />
      ))}
      <AddCardButton page={tab.id} />
    </div>
  );
};
