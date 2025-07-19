import { SALERARE_CARDS_PATH } from "../files/constants.js";
import { getSaleRareCards } from "../modules/sale-rare/sale-rare.js";
import { writeFile } from "fs/promises";
export const SaleRareRoute = (app) => {
  app.get("/api/salerare/list", async (req, res) => {
    res.send(await getSaleRareCards());
  });

  app.post("/api/salerare/change", async (req, res) => {
    await writeFile(SALERARE_CARDS_PATH, JSON.stringify(req.body));
    res.send("Ok");
  });
};
