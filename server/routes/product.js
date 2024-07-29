import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.js";
import upload from "../middlewares/multer.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/products", auth, isAdmin, upload.single("image"), createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.put(
  "/products/:id",
  auth,
  isAdmin,
  upload.single("image"),
  updateProduct
);
router.delete("/products/:id", auth, isAdmin, deleteProduct);

export default router;
