import { combine, createEffect, createEvent, createStore } from "effector";
import { ApiInstance } from "../../helpers/api";
import {
  addItemToPage,
  changeItemOnPage,
  deleteItemFromPage,
  setCardPositionOnPage,
  transferItemFromToPage,
} from "./helpers";
import type { Themes } from "./theme";

export type TItem = {
  number: string;
  expansion: string;
  price: string;
  rarity: string;
  description: string;
  image: string;
  sold: false;
  id: ReturnType<typeof crypto.randomUUID>;
};

export type TPage = {
  id: ReturnType<typeof crypto.randomUUID>;
  cards: TItem[];
  theme: keyof typeof Themes;
};

export const addPage = createEvent("add page");
export const addItem = createEvent<{
  item: Omit<TItem, "id" | "page">;
  page: string;
}>("add item");
export const deleteItem = createEvent<{ page: string; id: string }>(
  "delete item"
);
export const changeItem = createEvent<{
  field: keyof TItem;
  id: string;
  page: string;
  value: string | boolean;
}>("change item");
export const transferItem = createEvent<{
  fromPage: string;
  toPage: string;
  id: string;
}>("transfer");
export const setPageTheme = createEvent<{
  page: string;
  theme: keyof typeof Themes;
}>("set theme");

export const setCardPosition = createEvent<{
  id: string;
  page: string;
  position: number;
}>("set position");

export const saveSaleFx = createEffect(async (data: TPage[]) => {
  await ApiInstance.post("/api/sale/form", data);
});

export const getSaleFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/sale/form");
  return response.data as TPage[];
});

export const $items = createStore<TPage[]>([
  {
    id: crypto.randomUUID(),
    cards: [],
    theme: "GOLD",
  },
])
  .on(addPage, (state) => {
    return [
      ...state,
      {
        id: crypto.randomUUID(),
        cards: [],
        theme: "GOLD",
      },
    ];
  })
  .on(addItem, (state, payload) => {
    return addItemToPage(state, payload.page, {
      ...payload.item,
      id: crypto.randomUUID(),
      sold: false,
    });
  })
  .on(getSaleFx.doneData, (_, payload) => payload)
  .on(deleteItem, (state, payload) => {
    return deleteItemFromPage(state, payload.page, payload.id);
  })
  .on(transferItem, (state, payload) =>
    transferItemFromToPage(state, payload.fromPage, payload.toPage, payload.id)
  )
  .on(changeItem, (state, payload) =>
    changeItemOnPage(
      state,
      payload.page,
      payload.id,
      payload.field,
      payload.value
    )
  )
  .on(setPageTheme, (state, payload) =>
    state.map((item) =>
      item.id === payload.page ? { ...item, theme: payload.theme } : item
    )
  )
  .on(setCardPosition, (state, payload) =>
    setCardPositionOnPage(state, payload.page, payload.id, payload.position)
  );

export const setPage = createEvent<string>("set page");

export const $page = createStore<string>("")
  .on(getSaleFx.doneData, (_, payload) => payload[0].id)
  .on(setPage, (_, payload) => payload);

export const $selectedPage = combine(
  { page: $page, items: $items },
  ({ page, items }) =>
    items.find((p) => p.id === page) ||
    ({
      id: crypto.randomUUID(),
      cards: [],
      theme: "GOLD",
    } as TPage)
);
