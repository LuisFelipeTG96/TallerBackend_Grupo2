import * as customerService from '../services/customer.service.js';

export const createCustomer = async (req, res) => {
  try {
    console.log(req.body)
    const customer_id = await customerService.createCustomer(req.body);
    res.status(201).json({"customer_id" : customer_id});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers();
    if(!customers || customers.length === 0) {
      return res.status(404).json({ error: 'No customers found' });
    }
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActiveCustomers = async (req, res) => {
  try {
    const customers = await customerService.getActiveCustomers();
    if(!customers || customers.length === 0) {
      return res.status(404).json({ error: 'No active customers found' });
    }
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCustomerById = async (req, res) => {
 
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCustomer = async (req, res) => {
  try {
    const response = await customerService.updateCustomer(req.params, req.body);
    if (!response) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({affectedRows: response.affectedRows});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const response = await customerService.deleteCustomer(req.params);
    if (!response) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({affectedRows: response.affectedRows});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};