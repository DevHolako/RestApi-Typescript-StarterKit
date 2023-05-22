import { Document, Schema, model } from "mongoose";

export interface I_Item {
  name: string;
}

export interface I_ItemDocument extends I_Item, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema<I_Item>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const ItemModel = model<I_ItemDocument>("Item", ItemSchema);

export { ItemModel };
