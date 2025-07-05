import { readFile, writeFile } from "fs/promises";
import { SALE_CARDS_PATH } from "../../files/constants.js";
import { getParsedContent } from "../../files/parsing/sync.js";
import { ExpansionsInSDK } from "../../files/parsing/parseCSV.js";

export const saveSale = async (data) => {
  await writeFile(SALE_CARDS_PATH, JSON.stringify(data));
};

export const getSale = async () => {
  const { first } = getParsedContent();
  const data = (await readFile(SALE_CARDS_PATH)).toString();
  return JSON.parse(data).map((item) => {
    return {
      ...item,
      cards: item.cards.map((card) => {
        const cardData =
          first.byExpansion[card.expansion]?.[card.number]?.[0] || {};

        return { ...card, count: cardData.count - 1 };
      }),
    };
  });
};

export const getSaleCards = async () => {
  const data = await getSale();
  const { first } = getParsedContent();

  return data.map((item) => {
    const card = first.byExpansion[item.expansion][item.number][0];

    if (!card) return { image: "error", price: "error" };

    return { image: card.images.card, count: card.count - 1, ...item };
  });
};

export const getCard = (slug, number) => {
  const { first } = getParsedContent();

  const expansion = Object.entries(ExpansionsInSDK).find((item) =>
    item.includes(slug)
  )[0];
  if (!expansion || !first.byExpansion[expansion]) return null;

  const expansionNumbers = Object.keys(first.byExpansion[expansion]);

  const num = expansionNumbers.find((item) =>
    item.startsWith(number.padStart(3, "0"))
  );

  const card = first.byExpansion[expansion][num][0];

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

export const getCardsSuggestions = (pages = []) => {
  const { first } = getParsedContent();

  const cards = Object.values(first.byExpansion)
    .map((item) => Object.values(item).flat())
    .flat();

  const rareCards = cards.filter((card) => {
    return (
      card.rarity !== "Common" &&
      card.rarity !== "Uncommon" &&
      card.rarity !== "Rare" &&
      card.count >= 2 &&
      card.variant !== "Jumbo Size" &&
      !card.variant.includes("Trick or Trade") &&
      (card.expansion_slug || "").includes("sv")
    );
  });

  const cardsInPages = pages
    .map((item) => item.cards)
    .flat()
    .map((item) => `${item.expansion}-${item.number}`);

  return (
    rareCards
      .filter(
        (item) => !cardsInPages.includes(`${item.expansion}-${item.number}`)
      )
      // .slice(0, 10)
      .map(({ expansion, expansion_slug, number }) => ({
        expansion,
        slug: expansion_slug,
        number,
      }))
  );
};
