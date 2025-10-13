"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALERARE_CARDS_PATH = exports.SALE_CARDS_PATH = exports.PRICES_CARDS_PATH = exports.NEED_CARDS_PATH = exports.SECOND_FILE_PATH = exports.FIRST_FILE_PATH = void 0;
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const storagePath = path_1.default.join(__dirname, "..", "..", "storage");
exports.FIRST_FILE_PATH = path_1.default.join(storagePath, "first.csv");
exports.SECOND_FILE_PATH = path_1.default.join(storagePath, "second.csv");
exports.NEED_CARDS_PATH = path_1.default.join(storagePath, "need.csv");
exports.PRICES_CARDS_PATH = path_1.default.join(storagePath, "prices.csv");
exports.SALE_CARDS_PATH = path_1.default.join(storagePath, "sale.json");
exports.SALERARE_CARDS_PATH = path_1.default.join(storagePath, "salerare.json");
