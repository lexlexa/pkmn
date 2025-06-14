import { withLayout } from "../../hocs/withLayout";
import styles from "./Sale.module.css";
import { Button, Tabs, type TabsProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useUnit } from "effector-react";
import { $items, addPage, getSaleFx, saveSaleFx, setPage } from "./store";
import { useEffect } from "react";
import { ItemsTab } from "./components/ItemsTab/ItemsTab";
import { SaleContent } from "./components/SaleContent/SaleContent";

export const Sale = withLayout(
  () => {
    const items = useUnit($items);

    useEffect(() => {
      getSaleFx();
    }, []);

    const handleSave = () => {
      saveSaleFx(items);
    };

    const handleTabChange = (pageId: string) => {
      setPage(pageId);
    };

    const tabs: TabsProps["items"] = items.map((item, index) => ({
      key: `${item.id}`,
      label: index,
      children: <ItemsTab tab={item} />,
    }));

    return (
      <div className={styles.container}>
        <div className={styles.aside}>
          <Tabs
            defaultActiveKey={`${items?.[0]?.id || "1"}`}
            items={tabs}
            size="small"
            onChange={handleTabChange}
            tabBarExtraContent={{
              right: (
                <Button onClick={() => addPage()} icon={<PlusOutlined />} />
              ),
            }}
          />
          <div className={styles.actions}>
            <Button color="primary" onClick={handleSave} variant="filled">
              Сохранить
            </Button>
            <Button color="primary" variant="filled">
              Сформировать
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <SaleContent />
        </div>
      </div>
    );
  },
  { noPadding: true }
);
