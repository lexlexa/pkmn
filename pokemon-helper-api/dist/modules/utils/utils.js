"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNotExistCards = exports.addCardsPrices = exports.filterNeedCards = void 0;
const sync_js_1 = require("../../files/parsing/sync.js");
const filterNeedCards = (data) => {
    const { first: { byExpansion: haveCards }, } = (0, sync_js_1.getParsedContent)();
    const needCards = data
        .split("\r\n")
        .map((item) => {
        const [, expansion, name, number, , variant] = item.split(",");
        // Если пустая строка
        if (!expansion || !name || !number || !variant)
            return item;
        // Если нет дополнения
        if (!haveCards[expansion])
            return item;
        // Есть нет карты
        if (!haveCards[expansion][number])
            return item;
        // Если нет варианта
        if (!haveCards[expansion][number].find((i) => i.variant === variant))
            return item;
        return item + "уже есть";
    })
        .filter((item) => item);
    return needCards.join("\r\n");
};
exports.filterNeedCards = filterNeedCards;
const addCardsPrices = (data) => {
    const { first: { byExpansion: haveCards }, } = (0, sync_js_1.getParsedContent)();
    const pricesData = data.split("\n").toSpliced(0, 2);
    const [, expansion] = pricesData[0].split(",");
    const haveCardsByExpansion = haveCards[expansion];
    const values = Object.values(haveCardsByExpansion).flat();
    // Обновление данных по уже существующим картам
    const newPricesData = pricesData.map((item) => {
        let [empty, expansion, name, number, variant, rarity, count, price] = item.split(",");
        let comment = "";
        if (!haveCards[expansion] || !haveCards[expansion][number]) {
            count = 0;
            comment = "Продано";
        }
        else {
            const card = haveCards[expansion][number].find((item) => item.variant === variant);
            if (!card || card.count === 1) {
                count = 0;
                comment = "Продано";
            }
            else if (Number(card.count) - 1 !== Number(count)) {
                comment = `Количество: ${count} > ${card.count - 1}`;
                count = card.count - 1;
            }
        }
        return [
            empty,
            expansion,
            name,
            number,
            variant,
            rarity,
            count,
            price.replace("\r", ""),
            comment,
        ].join(",");
    });
    // Добавляем карты которых нет в списке
    const notExistPrices = values
        .filter((item) => {
        if (![
            "Normal",
            "Reverse Holo",
            "Normal Holo",
            "Cosmos Holo",
            "Trick or Trade 2024",
            "Trick or Trade 2023",
            "Non-holo",
        ].includes(item.variant)) {
            return false;
        }
        if (!["Common", "Uncommon", "Rare"].includes(item.rarity)) {
            return false;
        }
        if (item.count <= 1) {
            return false;
        }
        const [num, num2] = item.number.split("/");
        if (!!num && !!num2 && Number(num) > Number(num2))
            return false;
        return !newPricesData.find((i) => i.includes(item.number) && i.includes(item.variant));
    })
        .map((item) => {
        return [
            "",
            item.expansion,
            item.name,
            item.number,
            item.variant,
            item.rarity,
            item.count - 1,
            "",
            "Добавлена карта",
        ].join(",");
    });
    const variantOrder = ["Normal", "Normal Holo", "Reverse Holo"];
    return [...newPricesData, ...notExistPrices]
        .toSorted((a, b) => {
        const [, , , aNumber, aVariant] = a.split(",");
        const [, , , bNumber, bVariant] = b.split(",");
        if (aNumber === bNumber) {
            return variantOrder.indexOf[aVariant] > variantOrder.indexOf(bVariant)
                ? -1
                : 1;
        }
        return aNumber > bNumber ? 1 : -1;
    })
        .join("\n");
};
exports.addCardsPrices = addCardsPrices;
const checkNotExistCards = (cards) => {
    const parsedCards = cards.split("\n").map((card) => {
        const [expansion, number, variant] = card.split(",");
        return { expansion, number, variant };
    });
    const { first: { byExpansion }, } = (0, sync_js_1.getParsedContent)();
    return parsedCards
        .filter((item) => {
        if (!byExpansion[item.expansion])
            return true;
        const expansion = byExpansion[item.expansion];
        const cardsNumbers = Object.keys(expansion);
        const itemNumber = cardsNumbers.find((i) => i.startsWith(item.number.padStart(3, "0")));
        if (!byExpansion[item.expansion][itemNumber])
            return true;
        const card = byExpansion[item.expansion][itemNumber];
        return !card.some((i) => item.variant == i.variant);
    })
        .map((item) => [item.expansion, item.number, item.variant].join(","))
        .join("\n");
};
exports.checkNotExistCards = checkNotExistCards;
