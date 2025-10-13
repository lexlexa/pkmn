import { FIRST_FILE_PATH, SECOND_FILE_PATH } from "../files/constants.js";
import { init, sync } from "../files/sync.ts";
import { writeFile } from "fs/promises";
import { type Application } from "express";
export const SyncRoute = (app: Application) => {
  app.post("/api/sync/first", async (req, res) => {
    // @ts-expect-error
    const data = (await req.files.first.data).toString();
    await writeFile(FIRST_FILE_PATH, data);
    init();
    res.send("");
  });

  app.post("/api/sync/second", async (req, res) => {
    // @ts-expect-error
    const data = (await req.files.second.data).toString();
    await writeFile(SECOND_FILE_PATH, data);
    init();
    res.send("");
  });
};
