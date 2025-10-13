"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpansionCSV = exports.getDuplicatesButtons = void 0;
const parseCSV_js_1 = require("../../files/parsing/parseCSV.js");
const sync_js_1 = require("../../files/parsing/sync.js");
const getDuplicatesCount = (expansion) => {
    return expansion.reduce((acc, curr) => {
        return acc + curr.count - 1;
    }, 0);
};
const getDuplicatesButtons = () => {
    const { first } = (0, sync_js_1.getParsedContent)();
    const buttons = Object.keys(first.byExpansion)
        .map((expansionKey) => {
        const duplicatesCount = getDuplicatesCount(Object.values(first.byExpansion[expansionKey]).flat());
        return {
            name: expansionKey,
            count: duplicatesCount,
        };
    })
        .filter((item) => item.count)
        .toSorted((a, b) => (a.count < b.count ? 1 : -1));
    return [...buttons, { name: "SWORD_SHIELD", count: "" }];
};
exports.getDuplicatesButtons = getDuplicatesButtons;
const getSwordAndShieldCards = () => {
    const { first } = (0, sync_js_1.getParsedContent)();
    const expansions = Object.entries(parseCSV_js_1.ExpansionsShortName)
        .filter(([name, short]) => [
        parseCSV_js_1.ExpansionsShortName["Sword & Shield"],
        parseCSV_js_1.ExpansionsShortName["Rebel Clash"],
        parseCSV_js_1.ExpansionsShortName["Darkness Ablase"],
        parseCSV_js_1.ExpansionsShortName["Champion's Path"],
        parseCSV_js_1.ExpansionsShortName["Vivid Voltage"],
        parseCSV_js_1.ExpansionsShortName["Shining Fates"],
        parseCSV_js_1.ExpansionsShortName["Battle Styles"],
        parseCSV_js_1.ExpansionsShortName["Chiling Reign"],
        parseCSV_js_1.ExpansionsShortName["Evolving Skies"],
        parseCSV_js_1.ExpansionsShortName["Celebrations"],
        parseCSV_js_1.ExpansionsShortName["Astral Radiance"],
        parseCSV_js_1.ExpansionsShortName["Pokémon GO"],
        parseCSV_js_1.ExpansionsShortName["Lost Origin"],
        parseCSV_js_1.ExpansionsShortName["Silver Tempest"],
        parseCSV_js_1.ExpansionsShortName["Crown Zenith"],
    ].includes(short))
        .map(([name]) => name);
    console.log(expansions);
    const cards = expansions
        .map((item) => Object.values(first.byExpansion[item] || {}).flat())
        .flat();
    const filteredCards = cards.filter((item) => {
        if (!["Common", "Uncommon", "Rare"].includes(item.rarity))
            return false;
        if (item.expansion !== "Celebrations")
            return true;
        if (item.count < 2)
            return false;
        return true;
    });
    const csv = filteredCards
        .map((item) => `${item.expansion},${item.name},${item.number},${item.variant},${item.rarity},${item.expansion === "Celebrations" ? item.count - 1 : item.count}`)
        .join("\n");
    return csv;
};
const createExpansionCSV = (expansion) => {
    const { first } = (0, sync_js_1.getParsedContent)();
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
        .map((item) => `${item.expansion},${item.name},${item.number},${item.variant},${item.rarity},${item.count - 1}`)
        .join("\n");
};
exports.createExpansionCSV = createExpansionCSV;
