import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { checkAdmin, checkAuth } from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", checkAuth, checkAdmin, addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
