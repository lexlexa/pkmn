import {
  editFilament,
  getFilamentList,
  saveFilament,
  saveFilamentStock,
} from "../modules/filament/filament.ts";
import { getSaleRareCards } from "../modules/sale-rare/sale-rare.js";
export const FilamentRoute = (app) => {
  app.get("/api/filament/list", async (req, res) => {
    res.send(await getFilamentList());
  });

  app.post("/api/filament/add", async (req, res) => {
    await saveFilament(req.body);

    res.send(await getFilamentList());
  });

  app.post("/api/filament/edit", async (req, res) => {
    await editFilament(req.body);

    res.send(await getFilamentList());
  });

  app.post("/api/filament/stock", async (req, res) => {
    await saveFilamentStock(req.body);

    res.send(await getFilamentList());
  });
};
