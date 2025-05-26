import { writeFile } from "fs/promises";
import { FIRST_FILE_PATH, SECOND_FILE_PATH } from "./constants.js";

export const writeFilesToStorage = async (first, second) => {
  await writeFile(FIRST_FILE_PATH, first);
  await writeFile(SECOND_FILE_PATH, second);
};
