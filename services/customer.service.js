import * as modelCustomer from "../models/customer.model.js";

export const getAllCustomers = async () => {
    console.log("------------service------------");
    const results = await modelCustomer.getAllCustomers();
    return results;
};

export const getCustomerByIdService = async (id_customer) => {
    console.log("------------service------------");
    const results = await modelCustomer.getCustomerById(id_customer);
    return results;
};

export const createCustomerService = async (objCustomer, id_customer) => {
    console.log("------------service------------");
    const result = await modelCustomer.createCustomer(objCustomer, id_customer);
    return result;
};

export const updateCustomerService = async (id_customer, objCustomer) => {
    console.log("------------service------------");
    const result = await modelCustomer.updateCustomer(id_customer, objCustomer);
    return result;
};

export const deleteCustomerService = async (id_customer) => {
    console.log("------------service------------");
    const result = await modelCustomer.deleteCustomer(id_customer);
    return result;
};
