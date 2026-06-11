import express from 'express';
import * as customerController from '../controllers/customer.controller.js';

const router = express.Router();

router.get('/', customerController.getCustomers);
router.get('/actives', customerController.getActiveCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/', customerController.createCustomer);
router.put('/:id', customerController.updateCustomer);
router.patch('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

export default router;