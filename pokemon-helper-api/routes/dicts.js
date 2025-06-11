import { getExpansionsDicts } from "../modules/dicts/dicts.js";

export const DictsRoute = (app) => {
  app.get("/api/dicts", async (req, res) => {
    res.send({ expansions: getExpansionsDicts() });
  });
};
