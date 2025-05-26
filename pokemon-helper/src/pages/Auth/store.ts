import { createEffect, createStore } from "effector";
import { ApiInstance } from "../../helpers/api";

export const authFx = createEffect(
  async ({ login, password }: { login: string; password: string }) => {
    const response = await ApiInstance.post("/api/auth", { login, password });
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  }
);

export const $token = createStore<string | null>(
  localStorage.getItem("token")
).on(authFx.doneData, (_, payload) => payload);
