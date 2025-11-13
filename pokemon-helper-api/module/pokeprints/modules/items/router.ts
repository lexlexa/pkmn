import express from "express";
import { createCategory, createItem, getCategoriesTree, getItemsList, updateCategory, updateItem } from "./service.ts";


const itemsRouter = express.Router();


itemsRouter.get("/items/categories", async (req, res) => {
    res.send(await getCategoriesTree());
});

itemsRouter.post("/items/categories", async (req, res) => {
    await createCategory(req.body)
    res.send(await getCategoriesTree());
});

itemsRouter.put("/items/categories", async (req, res) => {
    await updateCategory(req.body)
    res.send(await getCategoriesTree());
});

itemsRouter.get("/items", async (req, res) => {
    res.send(await getItemsList());
});

itemsRouter.post("/items", async (req, res) => {
    await createItem(req.body);
    res.send(await getItemsList());
});

itemsRouter.put("/items", async (req, res) => {
    await updateItem(req.body);
    res.send(await getItemsList());
});

export { itemsRouter };
