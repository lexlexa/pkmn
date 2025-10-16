import { createEffect } from "effector";
import { ApiInstance } from "./api";

type TArguments = { url: string };

export const getEffectorCrud = <T extends {}, K>({ url }: TArguments) => {
  const createEffectFx = createEffect(async (data: T) => {
    const response = await ApiInstance.post(url, data);
    return response.data as K;
  });

  const updateEffectFx = createEffect(async (data: T) => {
    const response = await ApiInstance.put(url, data);
    return response.data as K;
  });

  const deleteEffectFx = createEffect(async (data: T) => {
    const response = await ApiInstance.delete(url, data);
    return response.data as K;
  });

  const readEffectFx = createEffect(async () => {
    const response = await ApiInstance.get(url);
    return response.data as K;
  });

  return {
    createFx: createEffectFx,
    updateFx: updateEffectFx,
    deleteFx: deleteEffectFx,
    readFx: readEffectFx,
  };
};
