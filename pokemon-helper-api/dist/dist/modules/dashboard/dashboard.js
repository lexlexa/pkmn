"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const parseCSV_js_1 = require("../../files/parsing/parseCSV.js");
const sync_js_1 = require("../../files/parsing/sync.js");
const constants_js_1 = require("./constants.js");
const getDashboardData = () => {
    const visibleExpansions = Object.keys(constants_js_1.ExpansionsData);
    const { first } = (0, sync_js_1.getParsedContent)();
    const expansionsKeys = Object.keys(first.byExpansion);
    return expansionsKeys
        .filter((item) => visibleExpansions.includes(parseCSV_js_1.ExpansionsInSDK[item]))
        .map((item) => {
        var _a;
        const cards = first.byExpansion[item] || {};
        const cardsInExpansion = ((_a = Object.values(cards)) === null || _a === void 0 ? void 0 : _a.flat()) || [];
        const allCount = Object.keys(cards).length;
        const normalCount = cardsInExpansion.filter((item) => item.variant === constants_js_1.VariantToDashboard.NORMAL).length;
        const reverseCount = cardsInExpansion.filter((item) => item.variant === constants_js_1.VariantToDashboard.REVERSE_HOLO).length;
        const normalHoloCount = cardsInExpansion.filter((item) => item.variant === constants_js_1.VariantToDashboard.NORMAL_HOLO).length;
        const dashboardData = constants_js_1.ExpansionsData[parseCSV_js_1.ExpansionsInSDK[item]];
        return {
            slug: parseCSV_js_1.ExpansionsInSDK[item],
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
exports.getDashboardData = getDashboardData;
