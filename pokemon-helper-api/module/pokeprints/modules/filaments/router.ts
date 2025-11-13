import express from "express";
import { createFilamentsItem, getFilamentsBrandsList, getFilamentsList, getFilamentsTypesList, TFilament, updateFilamentsItem } from "./service.ts";


const filamentsRouter = express.Router();



filamentsRouter.get('/filaments/brands', async (req, res) => {
    res.send(await getFilamentsBrandsList())
})

filamentsRouter.get('/filaments/types', async (req, res) => {
    res.send(await getFilamentsTypesList())
})


filamentsRouter.get("/filaments", async (req, res) => {
    res.send(await getFilamentsList());
});

filamentsRouter.post("/filaments", async (req, res) => {
    const newData = req.body as TFilament;
    await createFilamentsItem(newData)
    res.send(await getFilamentsList());
});

filamentsRouter.put("/filaments", async (req, res) => {
    const newData = req.body as TFilament;
    await updateFilamentsItem(newData)
    res.send(await getFilamentsList());
});

export { filamentsRouter };
