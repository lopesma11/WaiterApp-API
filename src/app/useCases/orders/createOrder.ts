import { Request, Response } from "express";
import { Order } from "../../models/Order";
import { z } from "zod";

const createOrderSchema = z.object({
  table: z.string().min(1, "Mesa é obrigatória"),
  products: z
    .array(
      z.object({
        product: z.string().min(1, "ID do produto é obrigatório"),
        quantity: z.number().int().positive("Quantidade deve ser positiva"),
      }),
    )
    .min(1, "O pedido deve ser pelo menos um produto"),
});

export async function createOrder(req: Request, res: Response) {
  try {
    const parseResult = createOrderSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({ errors: parseResult.error.flatten().fieldErrors });
      return;
    }

    const { table, products } = req.body;
    const order = await Order.create({ table, products });

    const populatedOrder = await order.populate("products.product");

    req.io.emit("order@new", populatedOrder);

    io.emit("order@new", orderDetails);
    res.status(201).json(order);
  } catch (error) {
    console.log("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
