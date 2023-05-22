import {
  getAllItems,
  createItem,
  deleteItem,
  getItemById,
  updateItem,
} from "@/controllers/StockController";
import { Router } from "express";

const StockRoutes = Router();

StockRoutes.get("/items", getAllItems);
StockRoutes.get("/items/:id", getItemById);
StockRoutes.post("/items", createItem);
StockRoutes.put("/items/:id", updateItem);
StockRoutes.delete("/items/:id", deleteItem);

export { StockRoutes };
