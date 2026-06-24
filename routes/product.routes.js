import _express from "express";
import * as cproduct from "../controllers/product.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = _express.Router();

router.get('/', authMiddleware.authMiddleware(), cproduct.getAllProducts);
router.post('/upload', authMiddleware.authMiddleware(), cproduct.upload);
router.get('/download/:id', authMiddleware.authMiddleware(), cproduct.download);
router.get('/:id', authMiddleware.authMiddleware(), cproduct.getProductById);
router.post('/', authMiddleware.authMiddleware(), cproduct.createProduct);
router.put('/:id', authMiddleware.authMiddleware(), cproduct.updateProduct);
router.delete('/:id', authMiddleware.authMiddleware(), cproduct.deleteProduct);

export default router;
