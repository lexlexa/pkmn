import { useUnit } from "effector-react";
import {
  $items,
  transferItemToIndex,
  type TItem,
  type TPage,
} from "../../store";
import styles from "./Dnd.module.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  // padding: grid,
  // width: 250
});
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const Item = ({ it, index }: { it: TItem; index: number }) => {
  return (
    <Draggable key={it.id} index={index} draggableId={it.id}>
      {(provided, snapshot) => {
        return (
          <div
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${it.image})` }}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

const Items = ({ item }: { item: TPage }) => {
  return (
    <Droppable direction="horizontal" droppableId={item.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          className={styles.items}
        >
          {item.cards.map((it, index) => {
            return <Item index={index} it={it} key={it.id} />;
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export const Dnd = () => {
  const items = useUnit($items);
  const handleDragEnd = (event: any) => {
    transferItemToIndex({
      fromPage: event.source.droppableId,
      toPage: event.destination.droppableId,
      id: event.draggableId,
      index: event.destination.index,
    });
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.container}>
        {items.map((item) => {
          return <Items item={item} key={item.id} />;
        })}
      </div>
    </DragDropContext>
  );
};
