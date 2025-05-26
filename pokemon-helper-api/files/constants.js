import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const FIRST_FILE_PATH = path.join(__dirname, "storage", "first.csv");
export const SECOND_FILE_PATH = path.join(__dirname, "storage", "second.csv");
export const NEED_CARDS_PATH = path.join(__dirname, "storage", "need.csv");
export const PRICES_CARDS_PATH = path.join(__dirname, "storage", "prices.csv");
