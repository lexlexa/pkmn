import axios from "axios";
import { createEffect, createStore } from "effector";

type DuplicateButton = {
  name: string;
  count: number;
};

export const loadDuplicatesButtonsFx = createEffect(async () => {
  const response = await axios.get("/api/duplicates/buttons");
  return response.data as DuplicateButton[];
});

export const $duplicatesButtons = createStore<DuplicateButton[]>([]).on(
  loadDuplicatesButtonsFx.doneData,
  (_, payload) => payload
);
