import * as orderService from '../services/order.service.js';

export const getAllOrders = async (req, res) => {
    console.log("------------controller------------");
    try {
        const orders = await orderService.getAllOrders();
        console.log("... despues de orderService.getAllOrders()");
        res.json(orders || []);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo registros" });
    }
};

export const getOrderById = async (req, res) => {
    console.log("------------controller------------");
    console.log("req.params.id: " + req.params.id);
    try {
        let orders = await orderService.getOrderByIdService(req.params.id);
        console.log("... despues de orderService.getOrderByIdService()");
        res.json(orders || {});
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo registro" });
    }
};

export const createOrder = async (req, res) => {
    console.log("------------controller------------");
    const objOrder = req.body;
    console.log(objOrder);
    try {
        let idOrder = await orderService.createOrderService(objOrder);
        console.log("... despues de orderService.createOrderService()");
        res.json({ "id_order": idOrder });
    } catch (error) {
        res.status(500).json({ error: "Error ingresando registros" });
    }
};

export const updateOrder = (req, res) => {
    console.log("------------controller------------");
    const objOrder = req.body;
    console.log(objOrder);
    orderService.updateOrderService(req.params.id, objOrder)
        .then(numRegistros => {
            console.log("... despues de orderService.updateOrderService()");
            res.json({ "numRegistros": numRegistros });
        })
        .catch(err => {
            res.status(500).json({ error: "Error actualizando registro" });
        });
};

export const deleteOrder = (req, res) => {
    console.log("------------controller------------");
    orderService.deleteOrderService(req.params.id)
        .then(numRegistros => {
            console.log("... despues de orderService.deleteOrderService()");
            res.json({ "numRegistros": numRegistros });
        })
        .catch(err => {
            res.status(500).json({ error: "Error eliminando registro" });
        });
};
