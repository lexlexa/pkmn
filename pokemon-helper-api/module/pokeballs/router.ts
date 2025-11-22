import express from "express";
import { uuid } from "../../helpers/uuid.ts";
import { writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
import fs from "fs";
import { IMAGES_PATH } from "../../files/constants.js";
import { filamentsRouter } from "./modules/filaments/router.ts";
import { configsRouter } from "./modules/configs/router.ts";
import { pokeballsRouter as innerPokeballsRouter } from "./modules/pokeballs/router.ts";
import { ordersRouter } from "./modules/orders/router.ts";
const pokeballsRouter = express.Router();

pokeballsRouter.use("/pokeballs", filamentsRouter);
pokeballsRouter.use("/pokeballs", configsRouter);
pokeballsRouter.use("/pokeballs", innerPokeballsRouter);
pokeballsRouter.use("/pokeballs", ordersRouter);

pokeballsRouter.get("/images", async (req, res) => {
  try {
    const { name, width, height } = req.query;

    if (!name) {
      return res.status(400).send({ error: "Image name is required" });
    }

    const imagePath = join(IMAGES_PATH, `${name}`);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).send({ error: "Image not found" });
    }

    const parsedWidth = width ? parseInt(width as string, 10) : null;
    const parsedHeight = height ? parseInt(height as string, 10) : null;

    let image = sharp(imagePath);

    if (parsedWidth || parsedHeight) {
      image = image.resize(parsedWidth, parsedHeight);
    }

    const buffer = await image.toBuffer();

    res.set("Content-Type", `image/${name.toString().split(".").pop()}`);
    res.send(buffer);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send({ error: "Error processing image" });
  }
});

pokeballsRouter.post("/images", async (req, res) => {
  // @ts-expect-error
  const data = req.files["pokeball-image"].data;

  // @ts-ignore
  const fileName = req.files?.["pokeball-image"].name;
  const extension = fileName.split(".")[1];
  const newFileName = `${uuid()}.${extension}`;
  console.log(newFileName);
  await writeFile(join(IMAGES_PATH, newFileName), data);

  res.send({ name: newFileName });
});

export { pokeballsRouter };
