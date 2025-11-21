import express from "express";
import axios from "axios";
import { init } from "./files/sync.ts";
import { ErrorRoute } from "./routes/errors.js";
import { DuplicatesRoute } from "./routes/duplicates.js";
import { DashboardRoute } from "./routes/dashboard.js";
import { UtilsRoute } from "./routes/utils.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import jwt from "jsonwebtoken";
import { SyncRoute } from "./routes/sync.ts";
import path from "path";
import { fileURLToPath } from "url";
import { SaleRoute } from "./routes/sale.js";
import { DictsRoute } from "./routes/dicts.js";
import { SaleRareRoute } from "./routes/sale-rare.js";
import { ImagesRoute } from "./routes/images.ts";
import { pokeballsRouter } from "./module/pokeballs/router.ts";
import { pokeprintsRouter } from "./module/pokeprints/router.ts";
import "dotenv/config";
import { TEMPLATES_PATH } from "./files/constants.js";
import { readFile } from "fs/promises";
import { getItemsList, getNewItemsList } from "./module/pokeprints/modules/items/service.ts";
// @ts-ignore
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

app.use(express.static("pokeprints"));
app.use(express.static("pokeprints/css"));
app.use(express.static("pokeprints/images"));
app.use('/admin', express.static('admin'))
app.use('/admin', express.static('admin/assets'))

const whilelist = [
  "/api/auth",
  "/api/utils/prices.csv",
  "/api/utils/cardsNeed.csv",
  "/api/duplicates/csv",
];

app.use((req, res, next) => {
  console.log(req.path);
  if (whilelist.includes(req.path)) return next();
  if (req.path.includes("external")) return next();
  console.log(req.method);
  if (req.path.includes("images") && req.method === "GET") return next();
  if (!req.path.includes("api")) return next();
  if (req.path.includes("image-proxy")) return next();

  if (!req.headers.token) {
    return res.status(403).send({ error: "Not authorized" });
  }
  // @ts-ignore
  const data = jwt.verify(req.headers.token, secret);

  if (data.user === login) {
    next();
    return;
  }
  res.status(403).send({ error: "Not authorized" });
});

const setupImageProxy = (app: express.Application) => {
  app.get("/api/image-proxy", async (req, res) => {
    const imageUrl = req.query.url;

    if (!imageUrl) {
      return res.status(400).send("URL parameter is required");
    }

    try {
      const response = await axios({
        method: "get",
        url: imageUrl as string,
        responseType: "stream",
      });

      // Установите заголовки ответа
      res.set("Content-Type", response.headers["content-type"]);
      res.set("Cache-Control", "public, max-age=31536000"); // Кэширование на 1 год

      // Передайте поток изображения клиенту
      // @ts-ignore
      response.data.pipe(res);
    } catch (error) {
      // console.error("Error proxying image:", error);
      res.status(500).send("Error proxying image");
    }
  });
};

// @ts-ignore
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

app.use("/api", pokeballsRouter);
app.use("/api", pokeprintsRouter);

ErrorRoute(app);
DuplicatesRoute(app);
DashboardRoute(app);
UtilsRoute(app);
SyncRoute(app);
SaleRoute(app);
DictsRoute(app);
SaleRareRoute(app);


const PokePrintsTemplates = {
  MAIN: (await readFile(path.join(TEMPLATES_PATH, 'pokeprints', 'main.html'))).toString(),
  PRODUCT_CARD: (await readFile(path.join(TEMPLATES_PATH, 'pokeprints', 'product-card.html'))).toString(),
  SLIDER_ITEM: (await readFile(path.join(TEMPLATES_PATH, 'pokeprints', 'slider-item.html'))).toString(),
  FAQ_ITEM: (await readFile(path.join(TEMPLATES_PATH, 'pokeprints', 'faq-item.html'))).toString(),
}

const TELEGRAM_URL = 'https://t.me/pokeprints'
const CARDS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSWONohR5u6xJC3P_ZsfefbqS4Sbq6TxyK9Ia91iGyOBwoDmLb1p4KfGM8wwAF6RE14MWLIGoVebPjW/pubhtml'

// ImagesRoute(app);
app.get("/{*splat}", async (req, res) => {

  const faqItems = [
    {
      question: 'Из чего сделана продукция?',
      answer: 'Все модели печатаются на FDM-принтере с высотой слоя всего 0.08 мм, что обеспечивает высокий уровень детализации. В основном мы используем качественный PLA-пластик, а для некоторых моделей — более прочный PETG.'
    },
    {
      question: 'Какие способы доставки доступны?',
      answer: 'Доставка оплачивается покупателем. Доступны все популярными службами доставки, такие как СДЭК, Яндекс Доставка, Ozon и др. Точная стоимость и сроки рассчитываются при оформлении заказа.'
    },
    {
      question: 'Как упаковываются заказы?',
      answer: 'Мы используем прочную непрозрачную коробку с наполнителем, чтобы гарантировать сохранность вашего заказа во время перевозки. Для самовывоза доступна подарочная прозрачная упаковка.'
    },
    {
      question: 'Какого размера покеболы в виде покемонов?',
      answer: 'Основание покебола (шар) имеет диаметр 7 см. Полный размер модели (с учетом ушей, крыльев, хвоста и других деталей) является уникальным для каждого покемона.'
    },
    {
      question: 'Доступны ли скидки?',
      answer: `
      <div style="padding: 0 24px; margin-top: -24px;">
      <div>Да, у нас есть несколько способов получить скидку:</div>
      <ul style="list-style: default; margin-left: 24px;">
        <li><b>Подписка в Telegram:</b> Подпишитесь на наш <a href="${TELEGRAM_URL}" target="_blank">канал</a> и получите постоянную скидку 5% на весь ассортимент.</li>
        <li><b>Оптовые заказы:</b> На многие позиции действуют специальные оптовые цены.</li>
        </ul></div>`
    },
    {
      question: 'Бывают ли дефекты?',
      answer: 'Мы тщательно проверяем каждую модель перед отправкой. Однако FDM-печать — это ручная работа, и на изделиях могут быть минимальные следы поддержек или слоев, что является нормальной особенностью технологии и не считается браком.'
    },
    {
      question: 'Какой срок изготовления заказа?',
      answer: 'Стандартный срок изготовления — 1-3 рабочих дня. Срок изготовления может быть увеличен в зависимости от количества активных заказов. Если вам нужен срочный заказ, пожалуйста, уточните его возможность в Telegram перед оформлением.'
    },
    {
      question: 'Что делать, если я получил поврежденный товар?',
      answer: 'Мы тщательно упаковываем заказы, но если вы получили поврежденный товар, сделайте фото повреждений и упаковки и свяжитесь с нами в течение 24 часов. Мы решим вопрос о замене.'
    },
    {
      question: 'Можно ли изменить цвет модели?',
      answer: 'Да, для многих моделей это возможно! Укажите ваши пожелания в комментарии к заказу, и мы свяжемся с вами для уточнения деталей.'
    },
    {
      question: 'Вы делаете модели на заказ по моему чертежу/рисунку?',
      answer: 'Да, мы занимаемся 3D-печатью на заказ. Обсудите ваш проект с нами в Telegram, и мы подготовим коммерческое предложение.'
    },
    {
      question: 'Как ухаживать за моделью?',
      answer: 'Готовое изделие не любит прямых солнечных лучей (может выцветать), влаги и механических нагрузок. Для очистки используйте сухую мягкую кисть или ткань. Не используйте агрессивные химические средства.'
    },
    {
      question: 'Как с вами быстро связаться?',
      answer: `Самый быстрый способ — написать нам в <a href="${TELEGRAM_URL}" target="_blank">Telegram</a>.`
    }
  ];

  const items = await getItemsList()
  const itemsForCarousel = await getNewItemsList()

  const products = items.map(item => PokePrintsTemplates.PRODUCT_CARD
    .replaceAll('{{name}}', item.name)
    .replaceAll('{{price}}', item.price.toString())
    .replaceAll('{{imageUrl}}', `/api/images?name=${item.items_images[0]?.image_id}`)
    .replaceAll('{{search}}', `${item.name.toLowerCase()}`)
  ).join('')


  const carousel = itemsForCarousel.map(item => PokePrintsTemplates.SLIDER_ITEM
    .replaceAll('{{name}}', item.name)
    .replaceAll('{{price}}', item.price.toString())
    .replaceAll('{{imageUrl}}', `/api/images?name=${item.items_images[0]?.image_id}`))
    .join('')

  const faq = faqItems.map(item => PokePrintsTemplates.FAQ_ITEM
    .replace('{{question}}', item.question)
    .replace('{{answer}}', item.answer)).join('')


  res.send(PokePrintsTemplates.MAIN
    .replace('{{products}}', products)
    .replace('{{slides}}', carousel)
    .replace('{{cardsUrl}}', CARDS_URL)
    .replace('{{telegramUrl}}', TELEGRAM_URL).replace('{{faq}}', faq))

});

app.get("/admin/{*splat}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

export default app;
