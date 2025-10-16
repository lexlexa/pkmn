import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storagePath = path.join(__dirname, "..", "..", "storage");

export const FIRST_FILE_PATH = path.join(storagePath, "first.csv");
export const SECOND_FILE_PATH = path.join(storagePath, "second.csv");
export const NEED_CARDS_PATH = path.join(storagePath, "need.csv");
export const PRICES_CARDS_PATH = path.join(storagePath, "prices.csv");

export const SALE_CARDS_PATH = path.join(storagePath, "sale.json");
export const SALERARE_CARDS_PATH = path.join(storagePath, "salerare.json");
export const FILAMENT_PATH = path.join(storagePath, "filament.json");
export const IMAGES_PATH = path.join(storagePath, "images");
export const POKEBALLS_CONFIGS = path.join(
  storagePath,
  "pokeball_configs.json"
);
export const POKEBALLS_PATH = path.join(storagePath, "pokeballs.json");
