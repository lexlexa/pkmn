import axios from "axios";
import { createEffect, createStore } from "effector";

type DashboardItem = {
  slug: string;
  all: { count: number; max: number };
  normal: { count: number; max: number };
  reverse: { count: number; max: number };
  normalHolo: { count: number; max: number };
};

export const loadDashboardFx = createEffect(async () => {
  const response = await axios.get("/api/dashboard");
  return response.data;
});

export const $dashboardData = createStore<DashboardItem[]>([]).on(
  loadDashboardFx.doneData,
  (_, payload) => payload
);
