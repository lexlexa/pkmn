"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantToDashboard = exports.ExpansionsData = void 0;
const parseCSV_js_1 = require("../../files/parsing/parseCSV.js");
exports.ExpansionsData = {
    [parseCSV_js_1.ExpansionsInSDK["Scarlet & Violet"]]: {
        max: 258,
        normalMax: 165,
        normalHoloMax: 93,
        reverseMax: 186,
    },
    [parseCSV_js_1.ExpansionsInSDK["Paldea Evolved"]]: {
        max: 279,
        normalMax: 165,
        normalHoloMax: 128,
        reverseMax: 176,
    },
    [parseCSV_js_1.ExpansionsInSDK["Obsidian Flames"]]: {
        max: 230,
        normalMax: 166,
        normalHoloMax: 64,
        reverseMax: 176,
    },
    [parseCSV_js_1.ExpansionsInSDK["Scarlet & Violet 151"]]: {
        max: 207,
        normalMax: 128,
        normalHoloMax: 79,
        reverseMax: 153,
    },
    [parseCSV_js_1.ExpansionsInSDK["Paradox Rift"]]: {
        max: 266,
        normalMax: 135,
        normalHoloMax: 131,
        reverseMax: 162,
    },
    [parseCSV_js_1.ExpansionsInSDK["Paldean Fates"]]: {
        max: 245,
        normalMax: 65,
        normalHoloMax: 180,
        reverseMax: 81,
    },
    [parseCSV_js_1.ExpansionsInSDK["Temporal Forces"]]: {
        max: 218,
        normalMax: 126,
        normalHoloMax: 92,
        reverseMax: 140,
    },
    [parseCSV_js_1.ExpansionsInSDK["Twilight Masquerade"]]: {
        max: 226,
        normalMax: 131,
        normalHoloMax: 95,
        reverseMax: 147,
    },
    [parseCSV_js_1.ExpansionsInSDK["Shrouded Fable"]]: {
        max: 99,
        normalMax: 48,
        normalHoloMax: 51,
        reverseMax: 55,
    },
    [parseCSV_js_1.ExpansionsInSDK["Stellar Crown"]]: {
        max: 175,
        normalMax: 110,
        normalHoloMax: 65,
        reverseMax: 125,
    },
    [parseCSV_js_1.ExpansionsInSDK["Surging Sparks"]]: {
        max: 252,
        normalMax: 149,
        normalHoloMax: 103,
        reverseMax: 165,
    },
    [parseCSV_js_1.ExpansionsInSDK["Prismatic Evolutions"]]: {
        max: 180,
        normalMax: 79,
        normalHoloMax: 101,
        reverseMax: 100,
    },
    [parseCSV_js_1.ExpansionsInSDK["Journey Together"]]: {
        max: 190,
        normalMax: 127,
        normalHoloMax: 63,
        reverseMax: 143,
    },
    [parseCSV_js_1.ExpansionsInSDK["Destined Rivals"]]: {
        max: 244,
        normalMax: 147,
        normalHoloMax: 97,
        reverseMax: 165,
    },
};
exports.VariantToDashboard = {
    NORMAL: "Normal",
    NORMAL_HOLO: "Normal Holo",
    REVERSE_HOLO: "Reverse Holo",
};
