"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoute = void 0;
const dashboard_js_1 = require("../modules/dashboard/dashboard.js");
const DashboardRoute = (app) => {
    app.get("/api/dashboard", (req, res) => {
        res.send((0, dashboard_js_1.getDashboardData)());
    });
};
exports.DashboardRoute = DashboardRoute;
