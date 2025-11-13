import express from "express";
import { filamentsRouter } from "./modules/filaments/router.ts";
import { itemsRouter } from "./modules/items/router.ts";

const pokeprintsRouter = express.Router();

pokeprintsRouter.use("/pokeprints", filamentsRouter);
pokeprintsRouter.use("/pokeprints", itemsRouter);

export { pokeprintsRouter }