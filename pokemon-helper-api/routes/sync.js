import { FIRST_FILE_PATH, SECOND_FILE_PATH } from "../files/constants.js";
import { init, sync } from "../files/sync.js";
import { writeFile } from "fs/promises";

export const SyncRoute = (app) => {
  app.post("/api/sync/first", async (req, res) => {
    const data = (await req.files.first.data).toString();
    await writeFile(FIRST_FILE_PATH, data);
    init();
    res.send("");
  });

  app.post("/api/sync/second", async (req, res) => {
    const data = (await req.files.second.data).toString();
    await writeFile(SECOND_FILE_PATH, data);
    init();
    res.send("");
  });
};
