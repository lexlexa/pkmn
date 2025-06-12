import { readFile, writeFile } from "fs/promises";
import { SALE_CARDS_PATH } from "../../files/constants.js";
import { getParsedContent } from "../../files/parsing/sync.js";
import { ExpansionsInSDK } from "../../files/parsing/parseCSV.js";

export const saveSale = async (data) => {
  await writeFile(SALE_CARDS_PATH, JSON.stringify(data));
};

export const getSale = async () => {
  const data = (await readFile(SALE_CARDS_PATH)).toString();
  return JSON.parse(data);
};

export const getSaleCards = async () => {
  const data = await getSale();
  const { first } = getParsedContent();

  return data.map((item) => {
    const card = first.byExpansion[item.expansion][item.number][0];

    if (!card) return { image: "error", price: "error" };
    console.log(card);
    return { image: card.images.card, ...item };
  });
};

export const getCard = (slug, number) => {
  const { first } = getParsedContent();

  const expansion = Object.entries(ExpansionsInSDK).find((item) =>
    item.includes(slug)
  )[0];
  if (!expansion || !first.byExpansion[expansion]) return null;

  const cardCountInExpansion = Object.keys(first.byExpansion[expansion])
    .find((i) => i.includes("/"))
    .split("/")[1];

  const fNumber = number.includes("/")
    ? number
    : `${number.padStart(3, "0")}/${cardCountInExpansion}`;

  const card = first.byExpansion[expansion][fNumber][0];

  if (!card) return null;

  return {
    number: card.number,
    expansion: card.expansion,
    price: "",
    rarity: card.rarity,
    description: `${card.short_expansion} ${card.number}`,
    image: card.images.card,
  };
};
