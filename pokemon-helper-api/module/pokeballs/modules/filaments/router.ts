import express from "express";
import { FileStorageUnit } from "../../../../helpers/file-storage-unit.ts";
import { FILAMENT_PATH } from "../../../../files/constants.js";

type TFilament = {
  id: string;
  title: string;
  code: string;
  color: string;
  inStock: boolean;
};

const filamentsRouter = express.Router();

const filamentsFileStorage = new FileStorageUnit<TFilament[]>(
  FILAMENT_PATH,
  []
);
filamentsFileStorage.init();

filamentsRouter.get("/filaments", async (req, res) => {
  res.send(await filamentsFileStorage.getData());
});

filamentsRouter.post("/filaments", async (req, res) => {
  const data = await filamentsFileStorage.getData();
  if (!data) return res.status(500).send();
  const newData = [...data, req.body as TFilament];
  await filamentsFileStorage.updateWithSync(newData);

  res.send(await filamentsFileStorage.getData());
});

filamentsRouter.put("/filaments", async (req, res) => {
  const data = await filamentsFileStorage.getData();
  if (!data) return res.status(500).send();
  const newData = data.map((item) =>
    item.id === req.body.id ? req.body : item
  );
  await filamentsFileStorage.updateWithSync(newData);

  res.send(await filamentsFileStorage.getData());
});

export { filamentsRouter };
