import { Router } from "express";

const ClientRoutes = Router();

ClientRoutes.get("/clients");
ClientRoutes.post("/clients");
ClientRoutes.put("/clients/:id");
ClientRoutes.delete("/clients/:id");

export { ClientRoutes };
