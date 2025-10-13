"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRareRoute = void 0;
const constants_js_1 = require("../files/constants.js");
const sale_rare_js_1 = require("../modules/sale-rare/sale-rare.js");
const promises_1 = require("fs/promises");
const sale_js_1 = require("../modules/sale/sale.js");
const SaleRareRoute = (app) => {
    app.get("/api/salerare/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send(yield (0, sale_rare_js_1.getSaleRareCards)());
    }));
    app.get("/api/external/salerare/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send(yield (0, sale_rare_js_1.getSaleRareCardsForExternal)());
    }));
    app.post("/api/salerare/change", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, promises_1.writeFile)(constants_js_1.SALERARE_CARDS_PATH, JSON.stringify(req.body));
        const sale = yield (0, sale_js_1.getSale)();
        const newSale = (0, sale_js_1.syncSalePrices)(req.body, sale);
        console.log(newSale);
        yield (0, sale_js_1.saveSale)(newSale);
        res.send("Ok");
    }));
};
exports.SaleRareRoute = SaleRareRoute;
