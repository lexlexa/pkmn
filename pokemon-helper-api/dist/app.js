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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const sync_js_1 = require("./files/sync.js");
const errors_js_1 = require("./routes/errors.js");
const duplicates_js_1 = require("./routes/duplicates.js");
const dashboard_js_1 = require("./routes/dashboard.js");
const utils_js_1 = require("./routes/utils.js");
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sync_js_2 = require("./routes/sync.js");
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const sale_js_1 = require("./routes/sale.js");
const dicts_js_1 = require("./routes/dicts.js");
const sale_rare_js_1 = require("./routes/sale-rare.js");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const login = "admin";
// D9a1ztM7Csr6WE09qEj7Bn1keCfvIT
const password = "D9a1ztM7Csr6WE09qEj7Bn1keCfvIT";
const secret = "pkmn_57_pkmn";
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Middleware для парсинга JSON
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.use((0, express_fileupload_1.default)({}));
app.use(express_1.default.static("public"));
app.use(express_1.default.static("public/assets"));
const whilelist = [
    "/api/auth",
    "/api/utils/prices.csv",
    "/api/utils/cardsNeed.csv",
    "/api/duplicates/csv",
];
app.use((req, res, next) => {
    if (whilelist.includes(req.path))
        return next();
    if (req.path.includes("external"))
        return next();
    if (!req.path.includes("api"))
        return next();
    if (req.path.includes("image-proxy"))
        return next();
    if (!req.headers.token) {
        return res.status(403).send({ error: "Not authorized" });
    }
    const data = jsonwebtoken_1.default.verify(req.headers.token, secret);
    if (data.user === login) {
        next();
        return;
    }
    res.status(403).send({ error: "Not authorized" });
});
const setupImageProxy = (app) => {
    app.get("/api/image-proxy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const imageUrl = req.query.url;
        if (!imageUrl) {
            return res.status(400).send("URL parameter is required");
        }
        try {
            const response = yield (0, axios_1.default)({
                method: "get",
                url: imageUrl,
                responseType: "stream",
            });
            // Установите заголовки ответа
            res.set("Content-Type", response.headers["content-type"]);
            res.set("Cache-Control", "public, max-age=31536000"); // Кэширование на 1 год
            // Передайте поток изображения клиенту
            response.data.pipe(res);
        }
        catch (error) {
            console.error("Error proxying image:", error);
            res.status(500).send("Error proxying image");
        }
    }));
};
// @ts-ignore
await (0, sync_js_1.init)();
setupImageProxy(app);
app.post("/api/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (data.login === login && data.password === password) {
        const token = jsonwebtoken_1.default.sign({ user: login }, secret);
        res.send({ token });
        return;
    }
    res.status(403).send({ error: "Not correct" });
}));
(0, errors_js_1.ErrorRoute)(app);
(0, duplicates_js_1.DuplicatesRoute)(app);
(0, dashboard_js_1.DashboardRoute)(app);
(0, utils_js_1.UtilsRoute)(app);
(0, sync_js_2.SyncRoute)(app);
(0, sale_js_1.SaleRoute)(app);
(0, dicts_js_1.DictsRoute)(app);
(0, sale_rare_js_1.SaleRareRoute)(app);
app.get("/{*splat}", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "public", "index.html"));
});
// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
exports.default = app;
