"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncSalePrices = exports.getCardsSuggestions = exports.getCard = exports.getSaleCards = exports.getSale = exports.saveSale = void 0;
const promises_1 = require("fs/promises");
const constants_js_1 = require("../../files/constants.js");
const sync_js_1 = require("../../files/parsing/sync.js");
const parseCSV_js_1 = require("../../files/parsing/parseCSV.js");
const saveSale = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, promises_1.writeFile)(constants_js_1.SALE_CARDS_PATH, JSON.stringify(data));
});
exports.saveSale = saveSale;
const getSale = () => __awaiter(void 0, void 0, void 0, function* () {
    const { first } = (0, sync_js_1.getParsedContent)();
    const data = (yield (0, promises_1.readFile)(constants_js_1.SALE_CARDS_PATH)).toString();
    return JSON.parse(data).map((item) => {
        return Object.assign(Object.assign({}, item), { cards: item.cards.map((card) => {
                var _a, _b;
                const cardData = ((_b = (_a = first.byExpansion[card.expansion]) === null || _a === void 0 ? void 0 : _a[card.number]) === null || _b === void 0 ? void 0 : _b[0]) || {};
                return Object.assign(Object.assign({}, card), { count: cardData.count - 1 });
            }) });
    });
});
exports.getSale = getSale;
const getSaleCards = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, exports.getSale)();
    const { first } = (0, sync_js_1.getParsedContent)();
    return data.map((item) => {
        const card = first.byExpansion[item.expansion][item.number][0];
        if (!card)
            return { image: "error", price: "error" };
        return Object.assign({ image: card.images.card, count: card.count - 1 }, item);
    });
});
exports.getSaleCards = getSaleCards;
const getCard = (slug, number) => {
    const { first } = (0, sync_js_1.getParsedContent)();
    const expansion = Object.entries(parseCSV_js_1.ExpansionsInSDK).find((item) => item.includes(slug))[0];
    if (!expansion || !first.byExpansion[expansion])
        return null;
    const expansionNumbers = Object.keys(first.byExpansion[expansion]);
    const num = expansionNumbers.find((item) => item.startsWith(number.padStart(3, "0")));
    const card = first.byExpansion[expansion][num][0];
    if (!card)
        return null;
    return {
        number: card.number,
        expansion: card.expansion,
        price: "",
        rarity: card.rarity,
        description: `${card.short_expansion} ${card.number}`,
        image: card.images.card,
    };
};
exports.getCard = getCard;
const getCardsSuggestions = (pages = []) => {
    const { first } = (0, sync_js_1.getParsedContent)();
    const cards = Object.values(first.byExpansion)
        .map((item) => Object.values(item).flat())
        .flat();
    const rareCards = cards.filter((card) => {
        return (card.rarity !== "Common" &&
            card.rarity !== "Uncommon" &&
            card.rarity !== "Rare" &&
            card.count >= 2 &&
            card.variant !== "Jumbo Size" &&
            !card.variant.includes("Trick or Trade") &&
            (card.expansion_slug || "").includes("sv"));
    });
    const cardsInPages = pages
        .map((item) => item.cards)
        .flat()
        .map((item) => `${item.expansion}-${item.number}`);
    return (rareCards
        .filter((item) => !cardsInPages.includes(`${item.expansion}-${item.number}`))
        // .slice(0, 10)
        .map(({ expansion, expansion_slug, number }) => ({
        expansion,
        slug: expansion_slug,
        number,
    })));
};
exports.getCardsSuggestions = getCardsSuggestions;
const syncSalePrices = (saleRare, sale) => {
    console.log(saleRare);
    return sale.map((item) => {
        return Object.assign(Object.assign({}, item), { cards: item.cards.map((card) => {
                var _a;
                console.log(saleRare === null || saleRare === void 0 ? void 0 : saleRare[card.expansion], card.expansion);
                const cardInSaleRare = (_a = saleRare === null || saleRare === void 0 ? void 0 : saleRare[card.expansion]) === null || _a === void 0 ? void 0 : _a.cards.find((i) => i.number === card.number);
                if (!cardInSaleRare)
                    return card;
                return Object.assign(Object.assign({}, card), { price: cardInSaleRare.price || "" });
            }) });
    });
};
exports.syncSalePrices = syncSalePrices;
