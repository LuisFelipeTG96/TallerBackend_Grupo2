import * as customerService from '../services/customer.service.js';

export const getAllCustomers = async (req, res) => {
  console.log("------------controller------------");
  try {
    const customers = await customerService.getAllCustomers();
    console.log("... despues de customerService.getAllCustomers()");
    res.json(customers || []);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo registros" });
  }
}

export const getCustomerById = async (req, res) => {
  console.log("------------controller------------");
  console.log("req.params.id: "+req.params.id);
  try {
    let customers = await customerService.getCustomerByIdService(req.params.id);
    console.log("... despues de customerService.getCustomerByIdService()");
    res.json(customers || []);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo registro" });
  };
};

export const createCustomer = async (req, res) => {
  console.log("------------controller------------");
  try {
    let idCustomer = await customerService.createCustomerService(objCustomer, req.body.id_customer);
    console.log("... despues de customerService.createCustomerService()");
    res.json({"id_customer": idCustomer });
  } catch (error) {
    res.status(500).json({ error: "Error ingresando registros" });
  }
};

export const updateCustomer = async (req, res) => {
  console.log("------------controller------------");
  const objCustomer = req.body;
  console.log(objCustomer);
  customerService.updateCustomerService(req.params.id, objCustomer)
    .then((numRegistros) => {
      console.log("... despues de customerService.updateCustomerService()");
      res.json({ "numRegistros": numRegistros });
    })
    .catch( err => {
      res.status(500).json({ error: "Error actualizando registro" });
    });
};

export const deleteCustomer = async (req, res) => {
  console.log("------------controller------------");
  customerService.deleteCustomerService(req.params.id)
    .then((numRegistros) => {
      console.log("... despues de customerService.deleteCustomerService()");
      res.json({ "numRegistros": numRegistros });
    })
    .catch( err => {
      res.status(500).json({ error: "Error eliminando registro" });
    });
};
