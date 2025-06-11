import { createEffect, createStore } from "effector";
import { ApiInstance } from "../helpers/api";

type Dicts = {
  expansions: { name: string; slug: string }[];
};

export const loadDictsFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/dicts");
  return response.data as Dicts;
});

export const $dicts = createStore<Dicts>({ expansions: [] }).on(
  loadDictsFx.doneData,
  (_, payload) => payload
);
