import { getFileStorage } from "../sync.ts";
import { parseCSV } from "./parseCSV.ts";

const ParsedContent: {
  first: ReturnType<typeof parseCSV>;
  second: ReturnType<typeof parseCSV>;
} = {
  first: { byExpansion: {}, count: 0 },
  second: { byExpansion: {}, count: 0 },
};

export const syncParsed = () => {
  const { first, second } = getFileStorage();

  ParsedContent.first = parseCSV(first);
  ParsedContent.second = parseCSV(second);
};

export const getParsedContent = () => ParsedContent;
