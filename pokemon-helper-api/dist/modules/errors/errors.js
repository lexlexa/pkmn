"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrors = exports.check = void 0;
const sync_js_1 = require("../../files/parsing/sync.js");
const check = (first, second) => {
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
                    return (a.name === b.name && a.count === b.count && a.variant === b.variant);
                });
                if (!found) {
                    notMatch.push(a);
                }
            });
        });
    });
    return notMatch;
};
exports.check = check;
const mergeErrors = (firstErrors, secondErrors) => {
    const mergedErrors = {};
    const addError = (error) => {
        const { expansion } = error;
        if (!mergedErrors[expansion]) {
            mergedErrors[expansion] = [];
        }
        mergedErrors[expansion].push(error);
    };
    firstErrors.forEach((item) => addError(Object.assign(Object.assign({}, item), { count: [item.count, 0] })));
    secondErrors.forEach((item) => {
        if (!mergedErrors[item.expansion]) {
            return addError(Object.assign(Object.assign({}, item), { count: [0, item.count] }));
        }
        const expansion = mergedErrors[item.expansion];
        const cardIndex = expansion.findIndex((ex) => item.name === ex.name &&
            item.variant === ex.variant &&
            item.number === ex.number);
        if (cardIndex >= 0) {
            mergedErrors[item.expansion][cardIndex].count[1] = item.count;
        }
        else {
            return addError(Object.assign(Object.assign({}, item), { count: [0, item.count] }));
        }
    });
    return mergedErrors;
};
const getErrors = () => {
    const { first, second } = (0, sync_js_1.getParsedContent)();
    const firstErrors = (0, exports.check)(first.byExpansion, second.byExpansion);
    const secondErrors = (0, exports.check)(second.byExpansion, first.byExpansion);
    return mergeErrors(firstErrors, secondErrors);
};
exports.getErrors = getErrors;
