import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const productsPerCategory = await Product.find()
      .where("category")
      .equals(categoryId);

    res.json(productsPerCategory);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.sendStatus(500);
  }
}
