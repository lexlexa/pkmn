"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaleRareCardsForExternal = exports.getSaleRareCards = void 0;
const sync_js_1 = require("../../files/parsing/sync.js");
const constants_js_1 = require("../../files/constants.js");
const read_js_1 = require("../../files/read.js");
const getSaleRareCards = () => __awaiter(void 0, void 0, void 0, function* () {
    const { first } = (0, sync_js_1.getParsedContent)();
    const savedData = JSON.parse(yield (0, read_js_1.readFilesWithFallback)(constants_js_1.SALERARE_CARDS_PATH, "{}"));
    const data = Object.keys(first.byExpansion).reduce((acc, key) => {
        var _a;
        const expansion = first.byExpansion[key] || {};
        const allCards = Object.values(expansion).flat();
        const filteredCards = allCards.filter((card) => {
            var _a, _b, _c;
            if (["Common", "Uncommon", "Rare", "Rare Holo"].includes(card.rarity) &&
                !["Poké Ball Holo", "Master Ball Holo"].includes(card.variant))
                return false;
            if ((_a = card === null || card === void 0 ? void 0 : card.expansion) === null || _a === void 0 ? void 0 : _a.includes("Energies"))
                return false;
            if ((_b = card === null || card === void 0 ? void 0 : card.variant) === null || _b === void 0 ? void 0 : _b.includes("Jumbo"))
                return false;
            if (card.count < 2 && ((_c = card === null || card === void 0 ? void 0 : card.expansion_slug) === null || _c === void 0 ? void 0 : _c.includes("sv")))
                return false;
            return true;
        });
        if (filteredCards.length === 0)
            return acc;
        const mappedCards = filteredCards.map((item) => {
            var _a;
            const savedCard = ((_a = savedData[key]) === null || _a === void 0 ? void 0 : _a.cards.find((card) => card.number === item.number)) || {};
            return Object.assign(Object.assign({}, item), { isRented: (savedCard === null || savedCard === void 0 ? void 0 : savedCard.isRented) || false, isHidden: (savedCard === null || savedCard === void 0 ? void 0 : savedCard.isHidden) || false, image: item.images.card, price: savedCard.price || "" });
        });
        return [
            ...acc,
            {
                expansion: key,
                cards: mappedCards,
                isHidden: ((_a = savedData === null || savedData === void 0 ? void 0 : savedData[key]) === null || _a === void 0 ? void 0 : _a.isHidden) || false,
            },
        ];
    }, []);
    return data;
});
exports.getSaleRareCards = getSaleRareCards;
const getSaleRareCardsForExternal = () => __awaiter(void 0, void 0, void 0, function* () {
    const cards = yield (0, exports.getSaleRareCards)();
    return cards
        .filter((item) => !item.isHidden)
        .map((item) => (Object.assign(Object.assign({}, item), { cards: item.cards.filter((card) => !card.isHidden) })));
});
exports.getSaleRareCardsForExternal = getSaleRareCardsForExternal;
