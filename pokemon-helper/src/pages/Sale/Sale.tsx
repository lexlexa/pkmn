import { withLayout } from "../../hocs/withLayout";
import styles from "./Sale.module.css";
import { Button, Tabs, type TabsProps } from "antd";
import { PlusOutlined, WarningOutlined } from "@ant-design/icons";
import { useUnit } from "effector-react";
import { $items, addPage, getSaleFx, saveSaleFx, setPage } from "./store";
import { useEffect, useState } from "react";
import { ItemsTab } from "./components/ItemsTab/ItemsTab";
import { SaleContent } from "./components/SaleContent/SaleContent";
import { Dnd } from "./components/Dnd/Dnd";

export const Sale = withLayout(
  () => {
    const items = useUnit($items);
    const [dragMode, setIsDragMode] = useState(false);

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
      icon: item.cards.some((c) => c.count < 1) ? <WarningOutlined /> : null,
    }));

    return (
      <div className={styles.container}>
        <Button
          onClick={() => setIsDragMode(!dragMode)}
          style={{ position: "fixed", bottom: 8, right: 8 }}
        >
          Режим
        </Button>
        {dragMode ? (
          <Dnd />
        ) : (
          <>
            <div className={styles.aside}>
              <Tabs
                defaultActiveKey={`${items?.[0]?.id || "1"}`}
                items={tabs}
                tabPosition="left"
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
          </>
        )}
      </div>
    );
  },
  { noPadding: true }
);
