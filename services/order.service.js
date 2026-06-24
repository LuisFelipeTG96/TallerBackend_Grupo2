import * as modelOrder from "../models/order.model.js";

export const getAllOrders = async () => {
    console.log("------------service------------");
    const results = await modelOrder.getAllOrders();
    return results;
};

export const getOrderByIdService = async (id_order) => {
    console.log("------------service------------");
    const results = await modelOrder.getOrderById(id_order);
    return results;
};

export const createOrderService = async (objOrder) => {
    console.log("------------service------------");
    const result = await modelOrder.createOrder(objOrder);
    return result;
};

export const updateOrderService = async (id_order, objOrder) => {
    console.log("------------service------------");
    const result = await modelOrder.updateOrder(id_order, objOrder);
    return result;
};

export const deleteOrderService = async (id_order) => {
    console.log("------------service------------");
    const result = await modelOrder.deleteOrder(id_order);
    return result;
};
