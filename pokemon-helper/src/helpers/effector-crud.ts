import { createEffect } from "effector";
import { ApiInstance } from "./api";

type TArguments = { url: string };

export const getEffectorCrud = <Create extends {}, Update extends {}, List>({ url }: TArguments) => {
  const createEffectFx = createEffect(async (data: Create) => {
    const response = await ApiInstance.post(url, data);
    return response.data as List;
  });

  const updateEffectFx = createEffect(async (data: Update) => {
    const response = await ApiInstance.put(url, data);
    return response.data as List;
  });

  const deleteEffectFx = createEffect(async (id: string | number) => {
    const response = await ApiInstance.delete(url + "?id=" + id);
    return response.data as List;
  });

  const readEffectFx = createEffect(async () => {
    const response = await ApiInstance.get(url);
    return response.data as List;
  });

  return {
    createFx: createEffectFx,
    updateFx: updateEffectFx,
    deleteFx: deleteEffectFx,
    readFx: readEffectFx,
  };
};
