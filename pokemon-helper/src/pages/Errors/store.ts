import { createEffect, createStore } from "effector";
import type { CardRarities, CardVariants } from "../../constants";
import { ApiInstance } from "../../helpers/api";

export type TError = {
  number: string;
  name: string;
  variant: CardVariants;
  expansion: string;
  rarity: CardRarities;
  count: [number, number];
  images: {
    card: string;
    expansion: string;
  };
};

export type TErrorByExpansion = {
  expansion: string;
  errors: TError[];
};

export const loadErrorsFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/errors");
  return Object.entries(response.data).map(([expansion, errors]) => ({
    expansion,
    errors,
  })) as TErrorByExpansion[];
});

export const $errors = createStore<TErrorByExpansion[]>([]).on(
  loadErrorsFx.doneData,
  (_, payload) => payload
);
