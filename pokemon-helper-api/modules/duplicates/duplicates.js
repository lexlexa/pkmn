import { getParsedContent } from "../../files/parsing/sync.js";

const getDuplicatesCount = (expansion) => {
  return expansion.reduce((acc, curr) => {
    return acc + curr.count - 1;
  }, 0);
};

export const getDuplicatesButtons = () => {
  const { first } = getParsedContent();

  const buttons = Object.keys(first.byExpansion)
    .map((expansionKey) => {
      console.log(first.byExpansion[expansionKey]);
      const duplicatesCount = getDuplicatesCount(
        Object.values(first.byExpansion[expansionKey]).flat()
      );
      return {
        name: expansionKey,
        count: duplicatesCount,
      };
    })
    .filter((item) => item.count)
    .toSorted((a, b) => (a.count < b.count ? 1 : -1));

  return buttons;
};

export const createExpansionCSV = (expansion) => {
  const { first } = getParsedContent();

  if (!first.byExpansion[expansion]) {
    return "";
  }

  const data = Object.values(first.byExpansion[expansion]).flat();

  return data
    .filter((item) => item.count > 1)
    .filter((item) => {
      const [num, numOf] = item.number.split("/");
      return Number(num) <= Number(numOf);
    })
    .map(
      (item) =>
        `${item.expansion},${item.name},${item.number},${item.variant},${
          item.rarity
        },${item.count - 1}`
    )
    .join("\n");
};
