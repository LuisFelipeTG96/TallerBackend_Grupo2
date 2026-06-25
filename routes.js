import _express from "express";
import rseguridad from "./routes/seguridad.routes.js";
import rcustomer from "./routes/customer.routes.js";
import rproduct from "./routes/product.routes.js";
import rorder from "./routes/order.routes.js";
import rfile from "./routes/file.routes.js";

const router = _express.Router();

router.use('/seguridad', rseguridad);
router.use('/customer', rcustomer);
router.use('/product', rproduct);
router.use('/order', rorder);
router.use('/archivos', rfile);

export default router;
