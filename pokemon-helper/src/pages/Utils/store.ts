import { createEffect, createStore } from "effector";
import { ApiInstance } from "../../helpers/api";

export const checkNotExistCardsFx = createEffect(async (cards: string) => {
  const response = await ApiInstance.post("/api/utils/not_exist", {
    data: cards,
  });
  return response.data;
});

export const $notExistCards = createStore("").on(
  checkNotExistCardsFx.doneData,
  (_, payload) => payload
);
