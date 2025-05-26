import {
  createExpansionCSV,
  getDuplicatesButtons,
} from "../modules/duplicates/duplicates.js";

export const DuplicatesRoute = (app) => {
  app.get("/api/duplicates/buttons", (req, res) => {
    res.send(getDuplicatesButtons());
  });

  app.get("/api/duplicates/csv", (req, res) => {
    console.log("Try to load", req.query);
    const csv = createExpansionCSV(req.query.q.replace(" and ", " & "));
    res.type("text/csv");
    res.attachment(`${req.query.q}.csv`).send(csv);
  });
};
