import { createEffect, createStore } from "effector";
import { ApiInstance } from "../../helpers/api";

type DuplicateButton = {
  name: string;
  count: number;
};

export const loadDuplicatesButtonsFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/duplicates/buttons");
  return response.data as DuplicateButton[];
});

export const $duplicatesButtons = createStore<DuplicateButton[]>([]).on(
  loadDuplicatesButtonsFx.doneData,
  (_, payload) => payload
);
