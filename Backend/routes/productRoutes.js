import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// getAllProducts
router.get("/", getAllProducts);
// getProduct
router.get("/:id", getProduct);
// createProducts
router.post("/", createProduct);
// updateProducts
router.put("/:id", updateProduct);
// deleteProducts
router.delete("/:id", deleteProduct);

export default router;
