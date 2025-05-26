import express from "express";
import { getFileStorage, init, sync } from "./files/sync.js";
import { getParsedContent } from "./files/parsing/sync.js";
import { ErrorRoute } from "./routes/errors.js";
import { DuplicatesRoute } from "./routes/duplicates.js";
import { DashboardRoute } from "./routes/dashboard.js";
import { UtilsRoute } from "./routes/utils.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import jwt from "jsonwebtoken";

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

app.use((req, res, next) => {
  if (req.path === "/api/auth") {
    next();
    return;
  }

  if (!req.headers.token) {
    return res.status(403).send({ error: "Not authorized" });
  }
  const data = jwt.verify(req.headers.token, secret);
  console.log("verified", data);
  if (data.user === login) {
    next();
    return;
  }
  res.status(403).send({ error: "Not authorized" });
});

await init();

// Простой маршрут
app.get("/", (req, res) => {
  res.json({ message: "Добро пожаловать в Express приложение!" });
});

app.post("/api/auth", async (req, res) => {
  const data = req.body;

  if (data.login === login && data.password === password) {
    const token = jwt.sign({ user: login }, secret);
    console.log(token);
    res.send({ token });
    return;
  }
  res.status(403).send({ error: "Not correct" });
});

ErrorRoute(app);
DuplicatesRoute(app);
DashboardRoute(app);
UtilsRoute(app);

app.get("*n", (req, res) => {
  res.send();
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

export default app;
