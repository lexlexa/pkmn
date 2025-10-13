import { SALERARE_CARDS_PATH } from "../files/constants.js";
import {
  getSaleRareCards,
  getSaleRareCardsForExternal,
} from "../modules/sale-rare/sale-rare.js";
import { writeFile } from "fs/promises";
import { getSale, saveSale, syncSalePrices } from "../modules/sale/sale.js";
export const SaleRareRoute = (app) => {
  app.get("/api/salerare/list", async (req, res) => {
    res.send(await getSaleRareCards());
  });

  app.get("/api/external/salerare/list", async (req, res) => {
    res.send(await getSaleRareCardsForExternal());
  });

  app.post("/api/salerare/change", async (req, res) => {
    await writeFile(SALERARE_CARDS_PATH, JSON.stringify(req.body));

    const sale = await getSale();
    const newSale = syncSalePrices(req.body, sale);

    await saveSale(newSale);

    res.send("Ok");
  });
};
