import { readFile, writeFile } from "fs/promises";
import { FILAMENT_PATH } from "../../files/constants.js";

type Filament = {
  id: string;
  color: string;
  title: string;
  inStock: boolean;
};

export const getFilamentList = async () => {
  const data = (await readFile(FILAMENT_PATH)).toString();

  return JSON.parse(data) as Filament[];
};

export const saveFilament = async (input: {
  title: string;
  color: string;
  id: string;
}) => {
  const parsed = await getFilamentList();

  const dataForSave = [...parsed, input];

  await writeFile(FILAMENT_PATH, JSON.stringify(dataForSave));
};

export const editFilament = async (data: any) => {
  const parsed = await getFilamentList();

  const dataForSave = parsed.map((item) =>
    item.id === data.id ? { ...item, ...data } : item
  );

  await writeFile(FILAMENT_PATH, JSON.stringify(dataForSave));
};

export const saveFilamentStock = async (input: {
  id: string;
  inStock: boolean;
}) => {
  const parsed = await getFilamentList();

  const dataForSave = parsed.map((item) =>
    item.id === input.id ? { ...item, inStock: input.inStock } : item
  );

  await writeFile(FILAMENT_PATH, JSON.stringify(dataForSave));
};
