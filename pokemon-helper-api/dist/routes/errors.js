"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRoute = void 0;
const errors_js_1 = require("../modules/errors/errors.js");
const ErrorRoute = (app) => {
    app.get("/api/errors", (req, res) => {
        res.send((0, errors_js_1.getErrors)());
    });
};
exports.ErrorRoute = ErrorRoute;
