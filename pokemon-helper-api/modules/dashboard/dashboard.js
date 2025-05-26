import { ExpansionsInSDK } from "../../files/parsing/parseCSV.js";
import { getParsedContent } from "../../files/parsing/sync.js";
import { ExpansionsData, VariantToDashboard } from "./constants.js";

export const getDashboardData = () => {
  const visibleExpansions = Object.keys(ExpansionsData);
  const { first } = getParsedContent();
  const expansionsKeys = Object.keys(first.byExpansion);

  return expansionsKeys
    .filter((item) => visibleExpansions.includes(ExpansionsInSDK[item]))
    .map((item) => {
      const cards = first.byExpansion[item] || {};
      const cardsInExpansion = Object.values(cards)?.flat() || [];
      const allCount = Object.keys(cards).length;
      const normalCount = cardsInExpansion.filter(
        (item) => item.variant === VariantToDashboard.NORMAL
      ).length;
      const reverseCount = cardsInExpansion.filter(
        (item) => item.variant === VariantToDashboard.REVERSE_HOLO
      ).length;
      const normalHoloCount = cardsInExpansion.filter(
        (item) => item.variant === VariantToDashboard.NORMAL_HOLO
      ).length;

      const dashboardData = ExpansionsData[ExpansionsInSDK[item]];

      return {
        slug: ExpansionsInSDK[item],
        all: { count: allCount, max: dashboardData.max },
        normal: { count: normalCount, max: dashboardData.normalMax },
        reverse: { count: reverseCount, max: dashboardData.reverseMax },
        normalHolo: {
          count: normalHoloCount,
          max: dashboardData.normalHoloMax,
        },
      };
    }, []);
};
