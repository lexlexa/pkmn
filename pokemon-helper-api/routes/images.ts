import { type Application } from "express";
import { uuid } from "../helpers/uuid.ts";
export const ImagesRoute = (app: Application) => {
  app.post("/api/images", async (req, res) => {
    console.log("test");
    // @ts-expect-error
    const data = await req.files["pokeball-image"].data;
    const fileName = `${uuid()}`;
  });
};
