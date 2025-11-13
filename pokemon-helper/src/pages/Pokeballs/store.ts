import { createStore } from "effector";
import { getEffectorCrud } from "../../helpers/effector-crud";

export type TPokeballFilament = {
  id: string;
  count: number | string;
};

export type TPokeball = {
  id: string;
  pokedexIndex: string;
  name: string;
  price: string;
  filament: TPokeballFilament[];
  images: string[];
  createdAt: string;
};

export type TFilament = {
  id: string;
  title: string;
  code: string;
  color: string;
  inStock: boolean;
};

export enum Accessories {
  VERTICAL_STAND = "vertical_stand",
  HORIZONTAL_STAND = "horizontal_stand",
}

export type TConfigs = {
  filamentCoeff: number;
  packingPrice: number;
  followersDiscount: number;
  electricityPrice: number;
  defectivePercent: number;
  accessoriesPrices: Record<Accessories, number>;
};

export enum OrderItemStatuses {
  NONE = "none",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum OrderStatues {
  NONE = "none",
  IN_PROGRESS = "in_progress",
  DELIVERING = "delivering",
  DONE = "done",
  CANCELED = "canceled",
}

export type TOrderItem = {
  pokeballId: string;
  accessories: [Accessories, number][];
  price: string;
  comment: string;
  id: string;
  status: OrderItemStatuses;
};

export type TOrder = {
  items: TOrderItem[];
  id: string;
  isSubscriber: boolean;
  clientName: string;
  clientLink: string;
  status: OrderStatues;
  price: string;
  discountPrice?: string;
  additionalDiscountPercent?: string;
  createdAt: string;
};

export type FilamentsBrand = {
  id: number;
  name: string;
}


export type FilamentsTypes = {
  id: number;
  name: string;
  brand_id: number 
}

export const filamentsFxs = getEffectorCrud<TFilament,TFilament, TFilament[]>({
  url: "/api/pokeballs/filaments",
});

export const configsFxs = getEffectorCrud<TConfigs,TConfigs, TConfigs>({
  url: "/api/pokeballs/configs",
});

export const pokeballsFxs = getEffectorCrud<TPokeball,TPokeball, TPokeball[]>({
  url: "/api/pokeballs/pokeballs",
});

export const ordersFxs = getEffectorCrud<TOrder,TOrder,  TOrder[]>({
  url: "/api/pokeballs/orders",
});

export const filamentBrandsFxs = getEffectorCrud<FilamentsBrand,FilamentsBrand, FilamentsBrand[]>({
  url: '/api/pokeprints/filaments/brands'
})

export const filamentTypesFxs = getEffectorCrud<FilamentsTypes,FilamentsTypes, FilamentsTypes[]>({
  url: '/api/pokeprints/filaments/types'
})

export const $filamentsBrands = createStore<FilamentsBrand[]>([])
  .on(filamentBrandsFxs.readFx.doneData, (_, payload) => payload)
  .on(filamentBrandsFxs.updateFx.doneData, (_, payload) => payload)
  .on(filamentBrandsFxs.createFx.doneData, (_, payload) => payload);

export const $filamentsTypes = createStore<FilamentsTypes[]>([])
  .on(filamentTypesFxs.readFx.doneData, (_, payload) => payload)
  .on(filamentTypesFxs.updateFx.doneData, (_, payload) => payload)
  .on(filamentTypesFxs.createFx.doneData, (_, payload) => payload);

export const $filaments = createStore<TFilament[]>([])
  .on(filamentsFxs.readFx.doneData, (_, payload) => payload)
  .on(filamentsFxs.updateFx.doneData, (_, payload) => payload)
  .on(filamentsFxs.createFx.doneData, (_, payload) => payload);

export const $configs = createStore<TConfigs>({
  filamentCoeff: 0,
  packingPrice: 0,
  followersDiscount: 0,
  electricityPrice: 0,
  defectivePercent: 0,
  accessoriesPrices: {
    [Accessories.HORIZONTAL_STAND]: 0,
    [Accessories.VERTICAL_STAND]: 0,
  },
})
  .on(configsFxs.readFx.doneData, (_, payload) => payload)
  .on(configsFxs.updateFx.doneData, (_, payload) => payload);

export const $pokeballs = createStore<TPokeball[]>([])
  .on(pokeballsFxs.readFx.doneData, (_, payload) => payload)
  .on(pokeballsFxs.updateFx.doneData, (_, payload) => payload)
  .on(pokeballsFxs.createFx.doneData, (_, payload) => payload);

export const $orders = createStore<TOrder[]>([])
  .on(ordersFxs.readFx.doneData, (_, payload) => payload)
  .on(ordersFxs.updateFx.doneData, (_, payload) => payload)
  .on(ordersFxs.createFx.doneData, (_, payload) => payload)
  .on(ordersFxs.deleteFx.doneData, (_, payload) => payload);
