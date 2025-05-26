import { getErrors } from "../modules/errors/errors.js";

export const ErrorRoute = (app) => {
  app.get("/api/errors", (req, res) => {
    res.send(getErrors());
  });
};
