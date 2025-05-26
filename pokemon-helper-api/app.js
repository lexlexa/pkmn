import express from "express";
import { getFileStorage, init, sync } from "./files/sync.js";
import { getParsedContent } from "./files/parsing/sync.js";
import { ErrorRoute } from "./routes/errors.js";
import { DuplicatesRoute } from "./routes/duplicates.js";
import { DashboardRoute } from "./routes/dashboard.js";
import { UtilsRoute } from "./routes/utils.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();
const port = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(fileUpload({}));

app.use(express.static("public"));

await init();

// Простой маршрут
app.get("/", (req, res) => {
  res.json({ message: "Добро пожаловать в Express приложение!" });
});

ErrorRoute(app);
DuplicatesRoute(app);
DashboardRoute(app);
UtilsRoute(app);

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

export default app;
