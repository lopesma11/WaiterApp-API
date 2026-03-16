import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function cancelOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      res.status(404).json({ error: "Pedido não encontrado" });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.log("Erro ao cancelar o pedido:", error);
    res.sendStatus(500);
  }
}
