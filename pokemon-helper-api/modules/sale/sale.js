import { readFile, writeFile } from "fs/promises";
import { SALE_CARDS_PATH } from "../../files/constants.js";
import { getParsedContent } from "../../files/parsing/sync.js";

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
