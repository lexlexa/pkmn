import { getFileStorage } from "../sync.js";
import { parseCSV } from "./parseCSV.js";

const ParsedContent = {
  first: {},
  second: {},
};

export const syncParsed = () => {
  const { first, second } = getFileStorage();

  ParsedContent.first = parseCSV(first);
  ParsedContent.second = parseCSV(second);
};

export const getParsedContent = () => ParsedContent;
