import { getParsedContent } from "../../files/parsing/sync.js";
import { SALERARE_CARDS_PATH } from "../../files/constants.js";
import { readFilesWithFallback } from "../../files/read.js";

export const getSaleRareCards = async () => {
  const { first } = getParsedContent();

  const savedData = JSON.parse(
    await readFilesWithFallback(SALERARE_CARDS_PATH, "{}")
  );

  const data = Object.keys(first.byExpansion).reduce((acc, key) => {
    const expansion = first.byExpansion[key] || {};
    const allCards = Object.values(expansion).flat();

    const filteredCards = allCards.filter((card) => {
      if (
        ["Common", "Uncommon", "Rare", "Rare Holo"].includes(card.rarity) &&
        !["Poké Ball Holo", "Master Ball Holo"].includes(card.variant)
      )
        return false;
      if (card?.expansion?.includes("Energies")) return false;
      if (card?.variant?.includes("Jumbo")) return false;
      if (card.count < 2 && card?.expansion_slug?.includes("sv")) return false;
      return true;
    });

    if (filteredCards.length === 0) return acc;

    const mappedCards = filteredCards.map((item) => {
      const savedCard =
        savedData[key]?.cards.find((card) => card.number === item.number) || {};
      return {
        ...item,
        isRented: savedCard?.isRented || false,
        isHidden: savedCard?.isHidden || false,
        image: item.images.card,
        price: savedCard.price || "",
      };
    });

    return [
      ...acc,
      {
        expansion: key,
        cards: mappedCards,
        isHidden: savedData?.[key]?.isHidden || false,
      },
    ];
  }, []);

  return data;
};

export const getSaleRareCardsForExternal = async () => {
  const cards = await getSaleRareCards();

  return cards
    .filter((item) => !item.isHidden)
    .map((item) => ({
      ...item,
      cards: item.cards.filter((card) => !card.isHidden),
    }));
};
