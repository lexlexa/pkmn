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
exports.UtilsRoute = void 0;
const constants_js_1 = require("../files/constants.js");
const utils_js_1 = require("../modules/utils/utils.js");
const promises_1 = require("fs/promises");
const UtilsRoute = (app) => {
    app.post("/api/utils/cardsNeed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = (yield req.files.need.data).toString();
        const filtered = (0, utils_js_1.filterNeedCards)(data);
        (0, promises_1.writeFile)(constants_js_1.NEED_CARDS_PATH, filtered);
        res.send("");
    }));
    app.get("/api/utils/cardsNeed.csv", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const file = (yield (0, promises_1.readFile)(constants_js_1.NEED_CARDS_PATH)).toString();
        res.type("text/csv");
        res.attachment(`need.csv`).send(file);
    }));
    app.post("/api/utils/prices", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = (yield req.files.prices.data).toString();
        const filtered = (0, utils_js_1.addCardsPrices)(data);
        (0, promises_1.writeFile)(constants_js_1.PRICES_CARDS_PATH, filtered);
        res.send("");
    }));
    app.post("/api/external/utils/prices", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = req.body.data;
        const filtered = (0, utils_js_1.addCardsPrices)(data);
        res.send(filtered);
    }));
    app.get("/api/utils/prices.csv", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const file = (yield (0, promises_1.readFile)(constants_js_1.PRICES_CARDS_PATH)).toString();
        res.type("text/csv");
        res.attachment(`need.csv`).send(file);
    }));
    app.post("/api/utils/not_exist", (req, res) => {
        res.send((0, utils_js_1.checkNotExistCards)(req.body.data));
    });
};
exports.UtilsRoute = UtilsRoute;
