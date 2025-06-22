import { combine, createEffect, createEvent, createStore } from "effector";
import { ApiInstance } from "../../helpers/api";
import {
  addItemToPage,
  changeItemOnPage,
  deleteItemFromPage,
  generateUUID,
  setCardPositionOnPage,
  swapCardsInPages,
  transferItemFromToPage,
  transferItemFromToPageToIndex,
} from "./helpers";
import type { Themes } from "./theme";

export type TItem = {
  number: string;
  expansion: string;
  price: string;
  rarity: string;
  description: string;
  image: string;
  isNew: boolean;
  isReserved: boolean;
  sold: false;
  count: number;
  id: ReturnType<typeof generateUUID>;
};

export type TPage = {
  id: ReturnType<typeof generateUUID>;
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
export const transferItemToIndex = createEvent<{
  fromPage: string;
  toPage: string;
  id: string;
  index: number;
}>("transfer index");
export const setPageTheme = createEvent<{
  page: string;
  theme: keyof typeof Themes;
}>("set theme");

export const setCardPosition = createEvent<{
  id: string;
  page: string;
  position: number;
}>("set position");

export const swapCards = createEvent<{
  cardFromId: string;
  cardToId: string;
}>();

export const saveSaleFx = createEffect(async (data: TPage[]) => {
  await ApiInstance.post("/api/sale/form", data);
});

export const getSaleFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/sale/form");
  return response.data as TPage[];
});

export const $items = createStore<TPage[]>([
  {
    id: generateUUID(),
    cards: [],
    theme: "GOLD",
  },
])
  .on(addPage, (state) => {
    return [
      ...state,
      {
        id: generateUUID(),
        cards: [],
        theme: "GOLD",
      },
    ];
  })
  .on(addItem, (state, payload) => {
    return addItemToPage(state, payload.page, {
      ...payload.item,
      id: generateUUID(),
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
  )
  .on(swapCards, (state, payload) =>
    swapCardsInPages(state, payload.cardFromId, payload.cardToId)
  )
  .on(transferItemToIndex, (state, payload) =>
    transferItemFromToPageToIndex(
      state,
      payload.fromPage,
      payload.toPage,
      payload.id,
      payload.index
    )
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
      id: generateUUID(),
      cards: [],
      theme: "GOLD",
    } as TPage)
);

export const loadSuggestionsFx = createEffect(async (data: TPage[]) => {
  const response = await ApiInstance.post("/api/sale/suggestions", data);
  return response.data as { expansion: string; number: string; slug: string }[];
});

export const $suggestions = createStore<
  { expansion: string; number: string; slug: string }[]
>([]).on(loadSuggestionsFx.doneData, (_, payload) => payload);
