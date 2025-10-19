import express from "express";
import { uuid } from "../../helpers/uuid.ts";
import { writeFile } from "fs/promises";
import { join } from "path";
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

pokeballsRouter.get("/images", (req, res) => {
  console.log("test");
  res.sendFile(join(IMAGES_PATH, `${req.query.name}`));
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
