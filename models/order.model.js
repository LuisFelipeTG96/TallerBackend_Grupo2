import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';
import { Customer } from './customer.model.js';
import { Product } from './product.model.js';

export const CustomerOrder = orm.define('CustomerOrder', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
    tableName: 'customer_orders',
    timestamps: false
});

export const OrderItem = orm.define('OrderItem', {
    order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    freezeTableName: true,
    tableName: 'order_items',
    timestamps: false
});

Customer.hasMany(CustomerOrder, { foreignKey: 'customer_id' });
CustomerOrder.belongsTo(Customer, { foreignKey: 'customer_id' });

CustomerOrder.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(CustomerOrder, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

export const getAllOrders = async () => {
    console.log("------------model------------");
    const results = await CustomerOrder.findAll({
        include: [Customer]
    });
    return results.map(u => u.toJSON());
};

export const getOrderById = async (id_order) => {
    console.log("------------model------------");
    const result = await CustomerOrder.findAll({
        include: [
            Customer,
            { model: OrderItem, include: [Product] }
        ],
        where: { order_id: id_order }
    });
    return result.map(u => u.toJSON());
};

export const createOrder = async (objOrder) => {
    try {
        const order = await CustomerOrder.create({
            customer_id: objOrder.customer_id,
            status: objOrder.status || 'pending',
            total: objOrder.total,
            order_date: new Date()
        });
        const orderId = order.toJSON().order_id;
        if (objOrder.items && objOrder.items.length > 0) {
            for (const item of objOrder.items) {
                await OrderItem.create({
                    order_id: orderId,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    subtotal: item.subtotal
                });
            }
        }
        return orderId;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateOrder = async (id_order, objOrder) => {
    try {
        const [updatedRows] = await CustomerOrder.update({
            status: objOrder.status,
            total: objOrder.total
        }, {
            where: { order_id: id_order }
        });
        return updatedRows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteOrder = async (id_order) => {
    try {
        const [updatedRows] = await CustomerOrder.update({
            status: 'cancelled'
        }, {
            where: { order_id: id_order }
        });
        return updatedRows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
