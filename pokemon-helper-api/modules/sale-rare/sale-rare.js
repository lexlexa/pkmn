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
      if (card.count < 2) return false;
      if (["Common", "Uncommon", "Rare"].includes(card.rarity)) return false;
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
