import { Router } from "express";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategories";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProducts } from "./app/useCases/products/createProducts";

export const router = Router();

// List Categories
router.get("/categories", listCategories);

// Create category
router.post("/categories", createCategories);

// List products
router.get("/products", listProducts);

// Create product
router.post("/products", createProducts);

// Get products by category
router.get("/categories/:categoryId/products", (req, res) => {
  res.send("OK");
});

// List orders
router.get("/orders", (req, res) => {
  res.send("OK");
});

// Create order
router.post("/orders", (req, res) => {
  res.send("OK");
});

// Change order status
router.patch("/orders/:orderId", (req, res) => {
  res.send("OK");
});

// Delete/cancel order
router.delete("/orders/:orderId", (req, res) => {
  res.send("OK");
});
