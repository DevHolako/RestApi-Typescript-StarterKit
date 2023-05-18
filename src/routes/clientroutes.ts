import {
  createClient,
  deleteClient,
  getAllClients,
  updateClient,
} from "@/controllers/ClientController";
import { Router } from "express";

const ClientRoutes = Router();

ClientRoutes.get("/clients", getAllClients);
ClientRoutes.post("/clients", createClient);
ClientRoutes.put("/clients/:id", updateClient);
ClientRoutes.delete("/clients/:id", deleteClient);

export { ClientRoutes };
