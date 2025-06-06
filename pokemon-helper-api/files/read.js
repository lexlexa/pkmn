import { readFile } from "fs/promises";
import { FIRST_FILE_PATH, SECOND_FILE_PATH } from "./constants.js";

export const readFilesFromStorage = async () => {
  try {
    const first = (await readFile(FIRST_FILE_PATH)).toString();
    const second = (await readFile(SECOND_FILE_PATH)).toString();
    return { first, second };
  } catch {
    return { first: "", second: "" };
  }
};
