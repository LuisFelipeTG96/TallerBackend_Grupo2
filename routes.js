import express from "express";
import customerRoutes from "./routes/customer.routes.js";

const router = express.Router();

router.use('/customer', customerRoutes)

export default router;