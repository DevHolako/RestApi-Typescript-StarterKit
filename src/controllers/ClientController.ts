import { ClientModel, I_Client } from "@/models/Client";
import { Request, Response } from "express";

interface R {
  client?: I_Client;
  clients?: I_Client[];
  message?: string;
}

// Get all clients
const getAllClients = async (_req: Request, res: Response<R>) => {
  try {
    const clients = (await ClientModel.find()) as I_Client[];
    return res.json({ clients });
  } catch (error: unknown) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a client
const createClient = async (
  req: Request<{}, {}, I_Client>,
  res: Response<R>
): Promise<void> => {
  try {
    const { email } = req.body;
    const isExsited = await ClientModel.findOne({ email });
    if (isExsited) {
      res.status(400).json({ message: "Email allready existe" });
    }
    const client = new ClientModel(req.body);
    const savedClient = await client.save();
    res
      .status(201)
      .json({ client: savedClient, message: "Client created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a client
const updateClient = async (req: Request, res: Response<R>): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedClient = (await ClientModel.findByIdAndUpdate(id, req.body, {
      new: true,
    })) as I_Client;
    if (!updatedClient) res.status(404).json({ message: "Client not found" });
    res.status(201).json({
      client: updatedClient,
      message: "Client updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a client
const deleteClient = async (
  req: Request,
  res: Response<R>
): Promise<Response> => {
  try {
    const { id } = req.params;
    const deletedClient = await ClientModel.findByIdAndDelete(id);
    if (!deletedClient) res.status(404).json({ message: "Client not found" });
    return res.json({ message: "Client deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllClients, createClient, updateClient, deleteClient };
