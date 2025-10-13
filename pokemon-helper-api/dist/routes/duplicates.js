"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatesRoute = void 0;
const duplicates_js_1 = require("../modules/duplicates/duplicates.js");
const DuplicatesRoute = (app) => {
    app.get("/api/duplicates/buttons", (req, res) => {
        res.send((0, duplicates_js_1.getDuplicatesButtons)());
    });
    app.get("/api/duplicates/csv", (req, res) => {
        const csv = (0, duplicates_js_1.createExpansionCSV)(req.query.q.replace(" and ", " & "));
        res.type("text/csv");
        res.attachment(`${req.query.q}.csv`).send(csv);
    });
};
exports.DuplicatesRoute = DuplicatesRoute;
