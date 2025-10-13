import {
  Expansions,
  ExpansionsInSDK,
  ExpansionsShortName,
} from "../../constants/expansions.ts";
import {
  Card,
  Expansion,
  ParsedExpansions,
  RawCard,
} from "../../types/cards.ts";

const fixedStrs = [
  ["25th Anniversary, Jumbo Size", "25th Anniversary - Jumbo Size"],
];

export const getCardImage = (expansion: string, number: string) => {
  return `https://images.pokemontcg.io/${expansion}/${number}.png`;
};

export const getExpansionImage = (expansion: string) => {
  return `https://images.pokemontcg.io/${expansion}/symbol.png`;
};

export const parseCSV = (csv: string) => {
  const rows = csv.trim().split("\n").slice(1); // Пропускаем заголовок

  const parsed: Card[] = rows.map((row) => {
    const [fixable, toFix] = fixedStrs.find((i) => row.includes(i[0])) || [];
    if (fixable) {
      row = row.replace(fixable, toFix);
    }

    const [, expansion, number, , name, rarity, variant, , , , count] =
      row.split(",");

    const exp = expansion.replaceAll('"', "") as Expansions;

    const card: RawCard = {
      expansion: exp,
      short_expansion: ExpansionsShortName[exp],
      expansion_slug: ExpansionsInSDK[exp],
      number,
      name: name.replaceAll('"', ""),
      rarity: rarity.replaceAll('"', ""),
      variant: variant.replaceAll('"', ""),
      count: parseInt(count),
    };

    const normalizeNumber = (number: string): string => {
      if (number.includes("/"))
        return Number(card.number.split("/")[0]).toString();
      if (!Number.isNaN(Number(number))) return Number(card.number).toString();
      if (number.includes("SWSH")) {
        return `SWSH${number.replace("SWSH", "").padStart(3, "0")}`;
      }
      if (number.includes("SWSH")) {
        return `SWSH${number.replace("SWSH", "").padStart(3, "0")}`;
      }
      if (number.includes("SM")) {
        return `SM${number.replace("SM", "").padStart(2, "0")}`;
      }
      if (number.includes("XY")) {
        return `XY${number.replace("XY", "").padStart(2, "0")}`;
      }
      return number;
    };

    const cardImage = getCardImage(
      ExpansionsInSDK[card.expansion],
      normalizeNumber(card.number)
    );
    const expansionImage = getExpansionImage(ExpansionsInSDK[card.expansion]);

    return {
      ...card,
      images: {
        card: cardImage,
        expansion: expansionImage,
      },
    };
  });

  // Группируем карты по expansion и number для удобства доступа
  const parsedByExpansion = parsed.reduce((acc: ParsedExpansions, card) => {
    // Если для текущего expansion ещё нет объекта, создаём его
    if (!acc[card.expansion]) {
      acc[card.expansion] = {};
    }
    const expansionGroup = acc[card.expansion]!;

    // Если для текущего номера карты ещё нет массива, создаём его
    if (!expansionGroup[card.number]) {
      expansionGroup[card.number] = [];
    }

    // Добавляем карту в соответствующий массив
    expansionGroup[card.number].push(card);

    return acc;
  }, {});

  return { byExpansion: parsedByExpansion, count: parsed.length };
};
