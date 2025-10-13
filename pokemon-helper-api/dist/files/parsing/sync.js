"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsedContent = exports.syncParsed = void 0;
const sync_js_1 = require("../sync.js");
const parseCSV_js_1 = require("./parseCSV.js");
const ParsedContent = {
    first: {},
    second: {},
};
const syncParsed = () => {
    const { first, second } = (0, sync_js_1.getFileStorage)();
    ParsedContent.first = (0, parseCSV_js_1.parseCSV)(first);
    ParsedContent.second = (0, parseCSV_js_1.parseCSV)(second);
};
exports.syncParsed = syncParsed;
const getParsedContent = () => ParsedContent;
exports.getParsedContent = getParsedContent;
