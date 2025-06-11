import { ExpansionsInSDK } from "../../files/parsing/parseCSV.js";
import { getParsedContent } from "../../files/parsing/sync.js";

export const getExpansionsDicts = () => {
  const { first } = getParsedContent();

  const expansions = Object.keys(first.byExpansion).map((key) => {
    return {
      name: key,
      slug: ExpansionsInSDK[key],
    };
  });

  return expansions;
};
