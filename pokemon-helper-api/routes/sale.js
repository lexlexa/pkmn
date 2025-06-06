import { getSale, getSaleCards, saveSale } from "../modules/sale/sale.js";

export const SaleRoute = (app) => {
  app.get("/api/sale/form", async (req, res) => {
    res.send(await getSale());
  });

  app.post("/api/sale/form", async (req, res) => {
    await saveSale(req.body);
    res.send("Ok");
  });

  app.get("/api/sale/cards", async (req, res) => {
    res.send(await getSaleCards());
  });
};
