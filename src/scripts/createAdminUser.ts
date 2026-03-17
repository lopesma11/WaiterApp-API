import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcryptjs";
import { User } from "../app/models/User";

const ADMIN = {
  name: "Administrador",
  email: "admin@novosnack.com",
  password: "novosnack123",
};

async function createAdminUser() {
  console.log("here");
  const mongoUri =
    process.env.MONGO_URI ?? "mongodb://localhost:27017/novosnack";

  await mongoose.connect(mongoUri);

  console.log(`Conectado ao MongoDB`);

  const existingUser = await User.findOne({ email: ADMIN.email });

  if (existingUser) {
    console.log(`Usuário admin já existe. Nada foi criado.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN.password, 12);

  await User.create({
    name: ADMIN.name,
    email: ADMIN.email,
    password: hashedPassword,
  });

  console.log(`Usuário admin criado com email ${ADMIN.email}`);
  await mongoose.disconnect();
}

createAdminUser().catch((err) => {
  console.error(`Erro ao criar admin:`, err);
  process.exit(1);
});
