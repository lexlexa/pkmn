"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpansionsDicts = void 0;
const parseCSV_js_1 = require("../../files/parsing/parseCSV.js");
const sync_js_1 = require("../../files/parsing/sync.js");
const getExpansionsDicts = () => {
    const { first } = (0, sync_js_1.getParsedContent)();
    const expansions = Object.keys(first.byExpansion)
        .filter((item) => !item.toLowerCase().includes("energies"))
        .map((key) => {
        return {
            name: key,
            slug: parseCSV_js_1.ExpansionsInSDK[key],
        };
    });
    return expansions;
};
exports.getExpansionsDicts = getExpansionsDicts;
