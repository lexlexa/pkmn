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
exports.SyncRoute = void 0;
const constants_js_1 = require("../files/constants.js");
const sync_js_1 = require("../files/sync.js");
const promises_1 = require("fs/promises");
const SyncRoute = (app) => {
    app.post("/api/sync/first", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = (yield req.files.first.data).toString();
        yield (0, promises_1.writeFile)(constants_js_1.FIRST_FILE_PATH, data);
        (0, sync_js_1.init)();
        res.send("");
    }));
    app.post("/api/sync/second", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = (yield req.files.second.data).toString();
        yield (0, promises_1.writeFile)(constants_js_1.SECOND_FILE_PATH, data);
        (0, sync_js_1.init)();
        res.send("");
    }));
};
exports.SyncRoute = SyncRoute;
