import {
  getCard,
  getCardsSuggestions,
  getSale,
  getSaleCards,
  saveSale,
} from "../modules/sale/sale.js";

export const SaleRoute = (app) => {
  app.get("/api/sale/form", async (req, res) => {
    res.send(await getSale());
  });

  app.post("/api/sale/form", async (req, res) => {
    await saveSale(req.body);
    res.send("Ok");
  });

  app.get("/api/card/find", async (req, res) => {
    console.log(req.query);
    const card = getCard(req.query.exp, req.query.number);
    if (!card) {
      return res.status(404).send("");
    }
    res.send(card);
  });

  app.post("/api/sale/suggestions", async (req, res) => {
    res.send(getCardsSuggestions(req.body));
  });
};
