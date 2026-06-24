import _express from "express";
import * as corder from "../controllers/order.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = _express.Router();

router.get('/', authMiddleware.authMiddleware(), corder.getAllOrders);
router.get('/:id', authMiddleware.authMiddleware(), corder.getOrderById);
router.post('/', authMiddleware.authMiddleware(), corder.createOrder);
router.put('/:id', authMiddleware.authMiddleware(), corder.updateOrder);
router.delete('/:id', authMiddleware.authMiddleware(), corder.deleteOrder);

export default router;
