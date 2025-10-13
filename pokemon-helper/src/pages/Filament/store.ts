import { createEffect, createStore } from "effector";
import { ApiInstance } from "../../helpers/api";

export type Filament = {
  id: string;
  color: string;
  title: string;
  code: string;
  inStock: boolean;
};

export const fetchFilamentListFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/filament/list");
  return response.data as Filament[];
});

export const fetchAddFilamentFx = createEffect(
  async (data: { title: string; color: string; id: string }) => {
    const response = await ApiInstance.post("/api/filament/add", data);
    return response.data as Filament[];
  }
);

export const fetchEditFilamentFx = createEffect(async (data: Filament) => {
  const response = await ApiInstance.post("/api/filament/edit", data);
  return response.data as Filament[];
});

export const fetchChangeFilamentStockFx = createEffect(
  async (data: { id: string; inStock: boolean }) => {
    const response = await ApiInstance.post("/api/filament/stock", data);
    return response.data as Filament[];
  }
);

export const $filament = createStore<Filament[]>([])
  .on(fetchFilamentListFx.doneData, (_, payload) => payload)
  .on(fetchAddFilamentFx.doneData, (_, payload) => payload)
  .on(fetchChangeFilamentStockFx.doneData, (_, payload) => payload);
