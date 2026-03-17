import { Request, Response } from "express";
import { z } from "zod";
import { Order } from "../../models/Order";

const changeStatusSchema = z.object({
  status: z.enum(["WAITING", "IN_PRODUCTION", "DONE"], {
    error: "Status deve ser: WAITING, IN_PRODUCTION ou DONE",
  }),
});

export async function changeOrderStatus(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { orderId } = req.params;

    const parseResult = changeStatusSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.flatten().fieldErrors });
      return;
    }

    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: orderId },
      { status },
      { new: true },
    );

    if (!order) {
      res.status(404).json({
        error: "Pedido não encontrado",
      });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.log("Erro ao alterar status:", error);
    res.sendStatus(500);
  }
}
