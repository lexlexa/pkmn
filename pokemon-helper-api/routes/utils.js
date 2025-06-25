import { NEED_CARDS_PATH, PRICES_CARDS_PATH } from "../files/constants.js";
import {
  addCardsPrices,
  checkNotExistCards,
  filterNeedCards,
} from "../modules/utils/utils.js";
import { writeFile, readFile } from "fs/promises";

export const UtilsRoute = (app) => {
  app.post("/api/utils/cardsNeed", async (req, res) => {
    const data = (await req.files.need.data).toString();
    const filtered = filterNeedCards(data);
    writeFile(NEED_CARDS_PATH, filtered);
    res.send("");
  });

  app.get("/api/utils/cardsNeed.csv", async (req, res) => {
    const file = (await readFile(NEED_CARDS_PATH)).toString();
    res.type("text/csv");
    res.attachment(`need.csv`).send(file);
  });

  app.post("/api/utils/prices", async (req, res) => {
    const data = (await req.files.prices.data).toString();
    const filtered = addCardsPrices(data);
    writeFile(PRICES_CARDS_PATH, filtered);
    res.send("");
  });

  app.post("/api/external/utils/prices", async (req, res) => {
    const data = req.body.data;

    const filtered = addCardsPrices(data);
    res.send(filtered);
  });

  app.get("/api/utils/prices.csv", async (req, res) => {
    const file = (await readFile(PRICES_CARDS_PATH)).toString();
    res.type("text/csv");
    res.attachment(`need.csv`).send(file);
  });

  app.post("/api/utils/not_exist", (req, res) => {
    res.send(checkNotExistCards(req.body.data));
  });
};
