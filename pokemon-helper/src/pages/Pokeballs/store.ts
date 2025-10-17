import { createStore } from "effector";
import { getEffectorCrud } from "../../helpers/effector-crud";

export type TPokeballFilament = {
  id: string;
  count: number;
};

export type TPokeball = {
  id: string;
  pokedexIndex: string;
  name: string;
  price: number;
  filament: TPokeballFilament[];
  images: string[];
};

export type TFilament = {
  id: string;
  title: string;
  code: string;
  color: string;
  inStock: boolean;
};

export type TConfigs = {
  filamentCoeff: number;
  packingPrice: number;
  followersDiscount: number;
  defaultStandPrice: number;
  verticalStandPrice: number;
  electricityPrice: number;
};

export const filamentsFxs = getEffectorCrud<TFilament, TFilament[]>({
  url: "/api/pokeballs/filaments",
});

export const configsFxs = getEffectorCrud<TConfigs, TConfigs>({
  url: "/api/pokeballs/configs",
});

export const pokeballsFxs = getEffectorCrud<TPokeball, TPokeball[]>({
  url: "/api/pokeballs/pokeballs",
});

export const $filaments = createStore<TFilament[]>([])
  .on(filamentsFxs.readFx.doneData, (_, payload) => payload)
  .on(filamentsFxs.updateFx.doneData, (_, payload) => payload)
  .on(filamentsFxs.createFx.doneData, (_, payload) => payload);

export const $configs = createStore<TConfigs>({
  filamentCoeff: 0,
  packingPrice: 0,
  followersDiscount: 0,
  defaultStandPrice: 0,
  verticalStandPrice: 0,
  electricityPrice: 0,
})
  .on(configsFxs.readFx.doneData, (_, payload) => payload)
  .on(configsFxs.updateFx.doneData, (_, payload) => payload);

export const $pokeballs = createStore<TPokeball[]>([])
  .on(pokeballsFxs.readFx.doneData, (_, payload) => payload)
  .on(pokeballsFxs.updateFx.doneData, (_, payload) => payload)
  .on(pokeballsFxs.createFx.doneData, (_, payload) => payload);
