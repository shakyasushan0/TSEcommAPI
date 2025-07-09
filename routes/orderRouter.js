import express from "express";
import { checkAdmin, checkAuth } from "../middleware/checkAuth.js";
import { addOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", checkAuth, addOrder);
router.get("/", checkAuth, checkAdmin, getOrders);

export default router;
