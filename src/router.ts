import path from "node:path";
import { Router } from "express";
import multer from "multer";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategories";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProducts } from "./app/useCases/products/createProducts";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";
import { login } from "./app/useCases/auth/login";
import { authenticate } from "./app/middlewares/auth";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

//-- Pública ------------------------------------------------------------------
router.post("/auth/login", login);
router.get("/categories", listCategories);
router.get("/products", listProducts);
router.post("/orders", createOrder);

//-- Protegidas ------------------------------------------------------------------
router.post("/categories", authenticate, createCategories);

router.post("/products", authenticate, upload.single("image"), createProducts);

router.get("/orders", authenticate, listOrders);

router.patch("/orders/:orderId", authenticate, changeOrderStatus);

router.delete("/orders/:orderId", authenticate, cancelOrder);
