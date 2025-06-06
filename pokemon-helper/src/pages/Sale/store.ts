import { createEffect, createEvent, createStore } from "effector";
import { ApiInstance } from "../../helpers/api";

type TItem = {
  number: string;
  expansion: string;
  price: string;
  id: number;
};

export const addItem = createEvent("add item");
export const deleteItem = createEvent<number>("delete item");
export const changeItem = createEvent<{
  field: string;
  index: number;
  value: string;
}>("change item");

export const saveSaleFx = createEffect(async (data: TItem[]) => {
  await ApiInstance.post("/api/sale/form", data);
});

export const getSaleFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/sale/form");
  return response.data as TItem[];
});

export const $items = createStore<TItem[]>([])
  .on(addItem, (state) => [
    ...state,
    {
      number: "",
      expansion: "",
      price: "",
      id: Math.max(...state.map((item) => item.id), 0) + 1,
    },
  ])
  .on(deleteItem, (state, index) => state.filter((_, i) => i !== index))
  .on(changeItem, (state, { field, index, value }) =>
    state.map((item, i) => (index === i ? { ...item, [field]: value } : item))
  )
  .on(getSaleFx.doneData, (_, payload) => payload);

export const getSaleCardsFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/sale/cards");
  return response.data as TItem[];
});

export const $saleCards = createStore<(TItem & { image: string })[]>([]).on(
  getSaleCardsFx.doneData,
  (_, payload) => payload
);
