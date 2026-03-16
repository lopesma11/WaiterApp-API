import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import path from "node:path";
import { router } from "./router";

const {
  MONGO_URI = "mongodb://localhost:27017/waiterapp",
  PORT = "3001",
  CLIENT_URL = "*",
} = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    const app = express();

    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST", "PATCH", "DELETE"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`Cliente conectado: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
      });
    });

    app.use(cors({ origin: CLIENT_URL }));

    app.use((req, _res, next) => {
      req.io = io;
      next();
    });

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads")),
    );
    app.use(express.json());
    app.use(router);

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("Erro ao conectar no MongoDB:", err));
