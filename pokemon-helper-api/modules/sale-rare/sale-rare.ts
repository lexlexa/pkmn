import { getParsedContent } from "../../files/parsing/sync.ts";
import { SALERARE_CARDS_PATH } from "../../files/constants.js";
import { readFilesWithFallback } from "../../files/read.js";
import { Card } from "../../types/cards.ts";
import { Expansions } from "../../constants/expansions.ts";

export const getSaleRareCards = async () => {
  const { first } = getParsedContent();

  const savedData = JSON.parse(
    await readFilesWithFallback(SALERARE_CARDS_PATH, "{}")
  );

  const data = Object.keys(first.byExpansion).map((key) => {
    const allExpansionCards = first.byExpansion[key as Expansions] || {};
    const flattedExpansionCards = Object.values(allExpansionCards).flat();

    const filteredCards = flattedExpansionCards.filter((card) => {
      // Из обычных карт берем только покеболы и мастерболы
      if (["Common", "Uncommon", "Rare", "Rare Holo"].includes(card.rarity)) {
        if (!["Poké Ball Holo", "Master Ball Holo"].includes(card.variant)) {
          return false;
        }
      }

      // Не берем энергии
      if (card?.expansion?.includes("Energies")) return false;

      // Не берем большие карты
      if (card?.variant?.includes("Jumbo")) return false;

      if (!card.expansion_slug) {
        console.log(card)
      }
        // Для SV берем только дубли, для остальных всё
      if (card.count < 2 && card.expansion_slug.includes("sv")) return false;
      if (card.count < 2 && card.expansion_slug.includes("me")) return false;


      return true;
    });

    const fullfilledCards = filteredCards.map((card) => {
      const savedCard =
        // @ts-ignore
        savedData[key]?.cards.find((item) => card.number === item.number) || {};
      return {
        ...card,
        isRented: savedCard?.isRented || false,
        isHidden: savedCard?.isHidden || false,
        image: card.images.card,
        price: savedCard.price || "",
        salePrice: savedCard.salePrice || "",
      };
    });

    return {
      expansion: key,
      cards: fullfilledCards,
      isHidden: savedData?.[key]?.isHidden || false,
    };
  });
  const specialPriceCards = data
    .map(({ cards }) => cards.filter(({ salePrice }) => !!salePrice))
    .flat();

  return [
    // {
    //   expansion: "Специальные цены",
    //   cards: specialPriceCards.map((card) => ({
    //     ...card,
    //     price: card.salePrice,
    //   })),
    //   isHidden: !specialPriceCards.length,
    // },
    ...data,
  ];
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
