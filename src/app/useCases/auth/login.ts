import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/User";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export async function login(req: Request, res: Response) {
  try {
    const parseResult = loginSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({ errors: parseResult.error.flatten().fieldErrors });
      return;
    }

    const { email, password } = parseResult.data;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error(`JWT_SECRET não configurado`);
    }

    const token = jwt.sign(
      { sub: user._id.toString(), name: user.name },
      secret,
      { expiresIn: "8h" },
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(`Erro no login:`, error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
