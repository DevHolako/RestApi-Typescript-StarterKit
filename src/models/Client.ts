import { Document, Schema, model } from "mongoose";

export interface I_Client {
  nom: string;
  prenom: string;
  email: string;
  address: string;
}

export interface I_ClientDocument extends I_Client, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ClientModel = model<I_ClientDocument>("User", ClientSchema);

export { ClientModel };
