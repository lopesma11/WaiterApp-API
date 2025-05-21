import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function createProducts(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    const product = await Product.create();

    res.status(201).json(product);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
}
