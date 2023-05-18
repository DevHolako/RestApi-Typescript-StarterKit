import { ClientModel, I_Client } from "@/models/Client";
import { Request, Response } from "express";

// Get all clients
const getAllClients = async (_req: Request, res: Response): Promise<void> => {
  try {
    const clients = await ClientModel.find();
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a client
const createClient = async (req: Request<{}, {}, I_Client>, res: Response) => {
  try {
    const { email } = req.body;
    const isExsited = await ClientModel.findOne({ email });
    if (isExsited) {
      return res.status(400).json({ message: "Email allready existe" });
    }
    const client = new ClientModel(req.body);
    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Update a client
const updateClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedClient = await ClientModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedClient) {
      res.json(updatedClient);
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a client
const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedClient = await ClientModel.findByIdAndDelete(id);
    if (deletedClient) {
      res.json({ message: "Client deleted successfully" });
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { getAllClients, createClient, updateClient, deleteClient };
