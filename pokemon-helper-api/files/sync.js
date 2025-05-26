import { syncParsed } from "./parsing/sync.js";
import { readFilesFromStorage } from "./read.js";

const FileStorage = {
  first: "",
  second: "",
};

export const sync = async () => {
  const { first, second } = await readFilesFromStorage();

  FileStorage.first = first;
  FileStorage.second = second;
};

export const resync = async (first, second) => {
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
