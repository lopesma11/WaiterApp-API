import { Request, Response } from "express";
import { Category } from "../../models/Category";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  icon: z.string().min(1, "Ícone é obrigatório"),
});

export async function createCategories(req: Request, res: Response) {
  try {
    const parseResult = createCategorySchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({ errors: parseResult.error.flatten().fieldErrors });
      return;
    }
    const { icon, name } = req.body;
    const category = await Category.create({ icon, name });

    res.status(201).json(category);
  } catch (error) {
    console.log("Erro ao criar categoria:", error);
    res.sendStatus(500);
  }
}
