import { type Application } from "express";
import { uuid } from "../helpers/uuid.ts";
export const ImagesRoute = (app: Application) => {
  app.post("/api/images", async (req, res) => {
    // @ts-expect-error
    const data = await req.files.first.data;
    console.log(data);
    const fileName = `${uuid()}`;
  });
};
