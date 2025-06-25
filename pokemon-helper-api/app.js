import express from "express";
import axios from "axios";
import { init } from "./files/sync.js";
import { ErrorRoute } from "./routes/errors.js";
import { DuplicatesRoute } from "./routes/duplicates.js";
import { DashboardRoute } from "./routes/dashboard.js";
import { UtilsRoute } from "./routes/utils.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import jwt from "jsonwebtoken";
import { SyncRoute } from "./routes/sync.js";
import path from "path";
import { fileURLToPath } from "url";
import { writeFile, readFile } from "fs/promises";
import { SaleRoute } from "./routes/sale.js";
import { DictsRoute } from "./routes/dicts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const login = "admin";

// D9a1ztM7Csr6WE09qEj7Bn1keCfvIT
const password = "D9a1ztM7Csr6WE09qEj7Bn1keCfvIT";
const secret = "pkmn_57_pkmn";

const app = express();
const port = process.env.PORT || 3001;

// Middleware для парсинга JSON
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(fileUpload({}));

app.use(express.static("public"));
app.use(express.static("public/assets"));

const whilelist = [
  "/api/auth",
  "/api/utils/prices.csv",
  "/api/utils/cardsNeed.csv",
  "/api/duplicates/csv",
];

app.use((req, res, next) => {
  if (whilelist.includes(req.path)) return next();
  if (req.path.includes("external")) return next();
  if (!req.path.includes("api")) return next();
  if (req.path.includes("image-proxy")) return next();

  if (!req.headers.token) {
    return res.status(403).send({ error: "Not authorized" });
  }
  const data = jwt.verify(req.headers.token, secret);

  if (data.user === login) {
    next();
    return;
  }
  res.status(403).send({ error: "Not authorized" });
});

const setupImageProxy = (app) => {
  app.get("/api/image-proxy", async (req, res) => {
    const imageUrl = req.query.url;

    if (!imageUrl) {
      return res.status(400).send("URL parameter is required");
    }

    try {
      const response = await axios({
        method: "get",
        url: imageUrl,
        responseType: "stream",
      });

      // Установите заголовки ответа
      res.set("Content-Type", response.headers["content-type"]);
      res.set("Cache-Control", "public, max-age=31536000"); // Кэширование на 1 год

      // Передайте поток изображения клиенту
      response.data.pipe(res);
    } catch (error) {
      console.error("Error proxying image:", error);
      res.status(500).send("Error proxying image");
    }
  });
};

await init();

setupImageProxy(app);

app.post("/api/auth", async (req, res) => {
  const data = req.body;

  if (data.login === login && data.password === password) {
    const token = jwt.sign({ user: login }, secret);

    res.send({ token });
    return;
  }
  res.status(403).send({ error: "Not correct" });
});

ErrorRoute(app);
DuplicatesRoute(app);
DashboardRoute(app);
UtilsRoute(app);
SyncRoute(app);
SaleRoute(app);
DictsRoute(app);

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

export default app;
