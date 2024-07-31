import { Router } from "express";
import { addItem, getCategories, getItems, checkout } from "../controllers/itemsController";

const itemsRouter: Router = Router();

itemsRouter.post("/addItem", addItem);
itemsRouter.get("/categories", getCategories);
itemsRouter.get("/items", getItems);
itemsRouter.post("/checkout", checkout);

export default itemsRouter;