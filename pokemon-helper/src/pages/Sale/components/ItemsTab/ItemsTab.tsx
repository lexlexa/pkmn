import {
  deletePage,
  setPageTheme,
  transferItemToIndex,
  type TPage,
} from "../../store";
import { Item } from "../Item/Item";
import { AddCardButton } from "../AddCardButton/AddCardButton";
import styles from "./ItemsTab.module.css";
import { Popconfirm, Select } from "antd";
import { Themes } from "../../theme";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { DeleteOutlined } from "@ant-design/icons";
type ItemsTabProps = {
  tab: TPage;
};

export const ItemsTab = ({ tab }: ItemsTabProps) => {
  const handleChaneTheme = (theme: string) => {
    setPageTheme({ page: tab.id, theme: theme as keyof typeof Themes });
  };

  const handleDragEnd = (event: any) => {
    transferItemToIndex({
      fromPage: event.source.droppableId,
      toPage: event.destination.droppableId,
      id: event.draggableId,
      index: event.destination.index,
    });
  };

  const handldeDeletePage = () => {
    deletePage({ pageId: tab.id });
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageSettings}>
        <div className={styles.title}>
          <span>Настройка страницы</span>{" "}
          <Popconfirm
            title="Точно удалить?"
            description="Карты, находящиеся на странице будут также удалены"
            okText="Да"
            cancelText="Нет"
            onConfirm={handldeDeletePage}
          >
            <DeleteOutlined style={{ color: "red", fontSize: 20 }} />
          </Popconfirm>
        </div>
        <Select
          onChange={handleChaneTheme}
          value={tab.theme || "GOLD"}
          style={{ width: "200px" }}
          options={Object.keys(Themes).map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable direction="vertical" droppableId={tab.id}>
          {(provided) => {
            return (
              <div ref={provided.innerRef} className={styles.items}>
                {tab.cards.map((item, index) => (
                  <Draggable key={item.id} index={index} draggableId={item.id}>
                    {(provided) => {
                      return (
                        <div
                          style={provided.draggableProps.style}
                          ref={provided.innerRef}
                          className={styles.item}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Item
                            key={`${item.id}`}
                            index={index}
                            page={tab.id}
                            item={item}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
      <AddCardButton page={tab.id} />
    </div>
  );
};
