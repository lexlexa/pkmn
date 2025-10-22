import { Accessories, OrderItemStatuses, OrderStatues } from "./store";

export const AccessoriesLang = {
  [Accessories.HORIZONTAL_STAND]: "Горизонатальная подставка",
  [Accessories.VERTICAL_STAND]: "Вертикальная подставка",
};

export const OrderStatusesLang = {
  [OrderStatues.NONE]: "Создан",
  [OrderStatues.CANCELED]: "Отменен",
  [OrderStatues.DELIVERING]: "В доставке",
  [OrderStatues.IN_PROGRESS]: "В производстве",
  [OrderStatues.DONE]: "Завершен",
};

export const OrderStatusesColor = {
  [OrderStatues.NONE]: "default",
  [OrderStatues.CANCELED]: "error",
  [OrderStatues.DELIVERING]: "processing",
  [OrderStatues.IN_PROGRESS]: "processing",
  [OrderStatues.DONE]: "success",
};

export const OrderItemStatusesLang = {
  [OrderItemStatuses.DONE]: "Готов",
  [OrderItemStatuses.IN_PROGRESS]: "В производстве",
  [OrderItemStatuses.NONE]: "Не начат",
};

export const OrderItemStatusesColor = {
  [OrderItemStatuses.DONE]: "success",
  [OrderItemStatuses.IN_PROGRESS]: "processing",
  [OrderItemStatuses.NONE]: "default",
};
