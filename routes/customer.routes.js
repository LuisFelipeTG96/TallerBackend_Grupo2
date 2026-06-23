import express from 'express';
import * as customerController from '../controllers/customer.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware.authMiddleware(), customerController.getCustomers);
router.get('/actives', authMiddleware.authMiddleware(), customerController.getActiveCustomers);
router.get('/:id', authMiddleware.authMiddleware(), customerController.getCustomerById);
router.post('/', authMiddleware.authMiddleware(), customerController.createCustomer);
router.put('/:id', authMiddleware.authMiddleware(), customerController.updateCustomer);
router.patch('/:id', authMiddleware.authMiddleware(), customerController.updateCustomer);
router.delete('/:id', authMiddleware.authMiddleware(), customerController.deleteCustomer);

export default router;