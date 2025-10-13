import { syncParsed } from "./parsing/sync.ts";
import { readFilesFromStorage } from "./read.js";
import { writeFilesToStorage } from "./write.js";

const FileStorage = {
  first: "",
  second: "",
};

export const sync = async () => {
  const { first, second } = await readFilesFromStorage();

  FileStorage.first = first;
  FileStorage.second = second;
};

export const resync = async (first: string, second: string) => {
  await writeFilesToStorage(first, second);
  await sync();
  await syncParsed();
};

export const init = async () => {
  await sync();
  await syncParsed();
};

export const getFileStorage = () => {
  return FileStorage;
};
