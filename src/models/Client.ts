import { Document, Schema, model } from "mongoose";

export interface I_Client {
  ice: number;
  nom: string;
  prenom: string;
  email: string;
  address: string;
}

export interface I_ClientDocument extends I_Client, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<I_Client>(
  {
    ice: {
      type: Number,
      unique: true,
      required: true,
    },
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

const ClientModel = model<I_ClientDocument>("Client", ClientSchema);

export { ClientModel };
