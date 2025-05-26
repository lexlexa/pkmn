import { createEffect, createStore } from "effector";
import { ApiInstance } from "../../helpers/api";

type DashboardItem = {
  slug: string;
  all: { count: number; max: number };
  normal: { count: number; max: number };
  reverse: { count: number; max: number };
  normalHolo: { count: number; max: number };
};

export const loadDashboardFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/dashboard");
  return response.data;
});

export const $dashboardData = createStore<DashboardItem[]>([]).on(
  loadDashboardFx.doneData,
  (_, payload) => payload
);
