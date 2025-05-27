import { getParsedContent } from "../../files/parsing/sync.js";

export const check = (first, second) => {
  const notMatch = [];

  // Проверяем наличие дополнения
  Object.keys(first).forEach((expansionKey) => {
    const firstExpansion = first[expansionKey];
    const secondExpansion = second[expansionKey];

    if (!secondExpansion) {
      notMatch.push(...Object.values(firstExpansion).flat());
      return;
    }

    // Проверяем наличие карты
    Object.keys(firstExpansion).forEach((cardKey) => {
      const firstCard = firstExpansion[cardKey];
      const secondCard = secondExpansion[cardKey];

      if (!secondCard) {
        notMatch.push(...firstCard);
        return;
      }
      // Проверяем наличие типа карты
      firstCard.forEach((a) => {
        const found = secondCard.find((b) => {
          return (
            a.name === b.name && a.count === b.count && a.variant === b.variant
          );
        });
        if (!found) {
          notMatch.push(a);
        }
      });
    });
  });

  return notMatch;
};

const mergeErrors = (firstErrors, secondErrors) => {
  const mergedErrors = {};

  const addError = (error) => {
    const { expansion } = error;
    if (!mergedErrors[expansion]) {
      mergedErrors[expansion] = [];
    }
    mergedErrors[expansion].push(error);
  };

  firstErrors.forEach((item) => addError({ ...item, count: [item.count, 0] }));

  secondErrors.forEach((item) => {
    if (!mergedErrors[item.expansion]) {
      return addError({ ...item, count: [0, item.count] });
    }

    const expansion = mergedErrors[item.expansion];
    const cardIndex = expansion.findIndex(
      (ex) =>
        item.name === ex.name &&
        item.variant === ex.variant &&
        item.number === ex.number
    );

    if (cardIndex >= 0) {
      mergedErrors[item.expansion][cardIndex].count[1] = item.count;
    } else {
      return addError({ ...item, count: [0, item.count] });
    }
  });

  return mergedErrors;
};

export const getErrors = () => {
  const { first, second } = getParsedContent();
  const firstErrors = check(first.byExpansion, second.byExpansion);
  const secondErrors = check(second.byExpansion, first.byExpansion);
  return mergeErrors(firstErrors, secondErrors);
};
