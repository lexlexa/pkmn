import { getDashboardData } from "../modules/dashboard/dashboard.js";

export const DashboardRoute = (app) => {
  app.get("/api/dashboard", (req, res) => {
    res.send(getDashboardData());
  });
};
