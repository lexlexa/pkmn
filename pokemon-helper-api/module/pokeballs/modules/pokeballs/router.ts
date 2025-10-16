import express from "express";
import { FileStorageUnit } from "../../../../helpers/file-storage-unit.ts";
import {
  FILAMENT_PATH,
  POKEBALLS_CONFIGS,
  POKEBALLS_PATH,
} from "../../../../files/constants.js";

export type TPokeballFilament = {
  id: string;
  count: number;
};

export type TPokeball = {
  id: string;
  pokedexIndex: string;
  name: string;
  filament: TPokeballFilament[];
  images: string[];
};
const pokeballsRouter = express.Router();

const pokeballsFileStorage = new FileStorageUnit<TPokeball[]>(
  POKEBALLS_PATH,
  []
);
pokeballsFileStorage.init();

pokeballsRouter.get("/pokeballs", async (req, res) => {
  res.send(await pokeballsFileStorage.getData());
});

pokeballsRouter.post("/pokeballs", async (req, res) => {
  const data = await pokeballsFileStorage.getData();
  if (!data) return res.status(500).send();
  const newData = [...data, req.body as TPokeball];
  await pokeballsFileStorage.updateWithSync(newData);

  res.send(await pokeballsFileStorage.getData());
});

pokeballsRouter.put("/pokeballs", async (req, res) => {
  const data = await pokeballsFileStorage.getData();
  if (!data) return res.status(500).send();
  const newData = data.map((item) =>
    item.id === req.body.id ? req.body : item
  );
  await pokeballsFileStorage.updateWithSync(newData);

  res.send(await pokeballsFileStorage.getData());
});

export { pokeballsRouter };
