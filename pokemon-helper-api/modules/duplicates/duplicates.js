import { ExpansionsShortName } from "../../files/parsing/parseCSV.js";
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

  return [...buttons, { name: "SWORD_SHIELD", count: "" }];
};

const getSwordAndShieldCards = () => {
  const { first } = getParsedContent();
  const expansions = Object.entries(ExpansionsShortName)
    .filter(([name, short]) =>
      [
        ExpansionsShortName["Sword & Shield"],
        ExpansionsShortName["Rebel Clash"],
        ExpansionsShortName["Darkness Ablase"],
        ExpansionsShortName["Champion's Path"],
        ExpansionsShortName["Vivid Voltage"],
        ExpansionsShortName["Shining Fates"],
        ExpansionsShortName["Battle Styles"],
        ExpansionsShortName["Chiling Reign"],
        ExpansionsShortName["Evolving Skies"],
        ExpansionsShortName["Celebrations"],
        ExpansionsShortName["Astral Radiance"],
        ExpansionsShortName["Pokémon GO"],
        ExpansionsShortName["Lost Origin"],
        ExpansionsShortName["Silver Tempest"],
        ExpansionsShortName["Crown Zenith"],
      ].includes(short)
    )
    .map(([name]) => name);
  console.log(expansions);

  const cards = expansions
    .map((item) => Object.values(first.byExpansion[item] || {}).flat())
    .flat();

  const filteredCards = cards.filter((item) => {
    if (!["Common", "Uncommon", "Rare"].includes(item.rarity)) return false;
    if (item.expansion !== "Celebrations") return true;
    if (item.count < 2) return false;
    return true;
  });

  const csv = filteredCards
    .map(
      (item) =>
        `${item.expansion},${item.name},${item.number},${item.variant},${
          item.rarity
        },${item.expansion === "Celebrations" ? item.count - 1 : item.count}`
    )
    .join("\n");

  return csv;
};

export const createExpansionCSV = (expansion) => {
  const { first } = getParsedContent();

  if (expansion === "SWORD_SHIELD") {
    return getSwordAndShieldCards();
  }

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
