import { I_Item, I_ItemDocument, ItemModel } from "@/models/Stock";
import { Request, Response } from "express";

interface R {
  item?: I_ItemDocument | I_Item;
  items?: I_Item[];
  message?: string;
}
export async function createItem(req: Request, res: Response<R>) {
  try {
    const { name }: I_Item = req.body;
    const isExisted = await ItemModel.findOne({ name }).lean().exec();
    if (isExisted) {
      return res.status(400).json({ message: "Item already existed" });
    }
    const createdItem: I_ItemDocument = await ItemModel.create({ name });
    return res
      .status(201)
      .json({ item: createdItem, message: "Item created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create item" });
  }
}

export async function getAllItems(
  _req: Request,
  res: Response<R>
): Promise<void> {
  try {
    const items: I_ItemDocument[] = await ItemModel.find();
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
}

export async function getItemById(
  req: Request,
  res: Response<R>
): Promise<void> {
  try {
    const itemId: string = req.params.id;
    const item = (await ItemModel.findById(itemId)) as I_Item;
    if (!item) res.status(404).json({ message: "Item not found" });
    res.json({ item, message: "item created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch item" });
  }
}

export async function updateItem(
  req: Request,
  res: Response<R>
): Promise<void> {
  try {
    const itemId: string = req.params.id;
    const updatedItemData: I_Item = req.body;
    const updatedItem: I_ItemDocument | null =
      await ItemModel.findByIdAndUpdate(itemId, updatedItemData, {
        new: true,
      });
    if (updatedItem) {
      res.json({ item: updatedItem, message: "item updated successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update item" });
  }
}

export async function deleteItem(
  req: Request,
  res: Response<R>
): Promise<void> {
  try {
    const itemId: string = req.params.id;
    const deletedItem: I_ItemDocument | null =
      await ItemModel.findByIdAndDelete(itemId);
    if (deletedItem) {
      res.json({ item: deletedItem, message: "item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item" });
  }
}
