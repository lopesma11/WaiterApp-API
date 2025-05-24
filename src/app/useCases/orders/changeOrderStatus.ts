import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function changeOrderStatus(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // ✅ Corrigido: usar !includes() para verificar se o status NÃO está na lista
    if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
      res.status(400).json({
        error: "Status should be one of these: WAITING, IN_PRODUCTION, DONE",
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.sendStatus(500);
  }
}
