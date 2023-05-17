import { Router } from "express";

const StockRoutes = Router();

StockRoutes.get("/clients");
StockRoutes.post("/clients");
StockRoutes.put("/clients/:id");
StockRoutes.delete("/clients/:id");

export { StockRoutes };
