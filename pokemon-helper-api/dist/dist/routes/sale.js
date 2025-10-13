"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRoute = void 0;
const sale_js_1 = require("../modules/sale/sale.js");
const SaleRoute = (app) => {
    app.get("/api/sale/form", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send(yield (0, sale_js_1.getSale)());
    }));
    app.post("/api/sale/form", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, sale_js_1.saveSale)(req.body);
        res.send("Ok");
    }));
    app.get("/api/card/find", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const card = (0, sale_js_1.getCard)(req.query.exp, req.query.number);
        if (!card) {
            return res.status(404).send("");
        }
        res.send(card);
    }));
    app.post("/api/sale/suggestions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send((0, sale_js_1.getCardsSuggestions)(req.body));
    }));
};
exports.SaleRoute = SaleRoute;
