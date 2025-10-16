import express from "express";
import { FileStorageUnit } from "../../../../helpers/file-storage-unit.ts";
import {
  FILAMENT_PATH,
  POKEBALLS_CONFIGS,
} from "../../../../files/constants.js";

type TConfigs = {
  filamentCoeff: number;
  packingPrice: number;
  followersDiscount: number;
};

const configsRouter = express.Router();

const configsFileStorage = new FileStorageUnit<TConfigs>(POKEBALLS_CONFIGS, {
  filamentCoeff: 0,
  packingPrice: 0,
  followersDiscount: 0,
});
configsFileStorage.init();

configsRouter.get("/configs", async (req, res) => {
  res.send(await configsFileStorage.getData());
});

configsRouter.put("/configs", async (req, res) => {
  const data = await configsFileStorage.getData();
  if (!data) return res.status(500).send();
  await configsFileStorage.updateWithSync(req.body);

  res.send(await configsFileStorage.getData());
});

export { configsRouter };
