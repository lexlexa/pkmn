import express from "express";
import { FileStorageUnit } from "../../../../helpers/file-storage-unit.ts";
import {
  FILAMENT_PATH,
  ORDERS_PATH,
  POKEBALLS_CONFIGS,
} from "../../../../files/constants.js";

export enum OrderItemStatuses {
  NONE = "none",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum OrderStatues {
  NONE = "none",
  IN_PROGRESS = "in_progress",
  DELIVERING = "delivering",
  DONE = "done",
  CANCELED = "canceled",
}

export type TOrderItem = {
  pokeballId: string;
  accessories: [string, number][];
  price: string;
  discountPrice?: string;
  comment: string;
  id: string;
  status: OrderItemStatuses;
};

export type TOrder = {
  items: TOrderItem[];
  id: string;
  isSubscriber: boolean;
  clientName: string;
  clientLink: string;
  status: OrderStatues;
  price: string;
  discountPrice?: string;
};

const ordersRouter = express.Router();

const ordersFileStorage = new FileStorageUnit<TOrder[]>(ORDERS_PATH, []);
ordersFileStorage.init();

ordersRouter.get("/orders", async (req, res) => {
  res.send(await ordersFileStorage.getData());
});

ordersRouter.post("/orders", async (req, res) => {
  const data = await ordersFileStorage.getData();
  if (!data) return res.status(500).send();
  const newData = [...data, req.body];
  await ordersFileStorage.updateWithSync(newData);

  res.send(await ordersFileStorage.getData());
});

ordersRouter.delete("/orders", async (req, res) => {
  const data = await ordersFileStorage.getData();
  if (!data) return res.status(500).send();
  const newData = data.filter((item) => item.id !== req.query.id);
  await ordersFileStorage.updateWithSync(newData);

  res.send(await ordersFileStorage.getData());
});

ordersRouter.put("/orders", async (req, res) => {
  const data = await ordersFileStorage.getData();
  if (!data) return res.status(500).send();
  const newData = data.map((item) =>
    item.id === req.body.id ? req.body : item
  );
  await ordersFileStorage.updateWithSync(newData);

  res.send(await ordersFileStorage.getData());
});

export { ordersRouter };
