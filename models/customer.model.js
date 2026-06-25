import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';

export const Customer = orm.define('Customer', {
    id_customer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'customer_id'
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 80]
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 80]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 120],
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 20]
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    tableName: 'customers',
    timestamps: false
});

export const connect = async () => {
    await orm.authenticate();
    console.log("Conexion establecida");
}

export const getAllCustomers = async () => {
    console.log("------------model------------");
    const results = await Customer.findAll({
        where: {
            is_active: true
        }
    });
    console.log(results);
    return results.map(u=> u.toJSON());
};

export const getCustomerById = async (id_customer) => {
    console.log("------------model------------");
    const result = await Customer.findAll({
        where: {
            id_customer: id_customer,
            is_active: true
        }
    });
    console.log(result);
    return result.map(u=> u.toJSON());
};

export const createCustomer = async (objCustomer, id_customer) => {
    try {
        const newCustomer = await Customer.create({
            first_name: objCustomer.first_name,
            last_name: objCustomer.last_name,
            email: objCustomer.email,
            phone: objCustomer.phone,
            created_at: new Date(),
            is_active: true
        });
        console.log(newCustomer);
        return newCustomer.toJSON().id_customer;
    }catch (error) {
        console.log("exception");
        console.log(error);
        throw error;
    }
};

export const updateCustomer = async (id_customer, objCustomer) => {
    try {
        const [updatedRows] = await Customer.update({
            first_name: objCustomer.first_name,
            last_name: objCustomer.last_name,
            email: objCustomer.email,
            phone: objCustomer.phone
        }, {
            where: {
                id_customer: id_customer
            }
        });
        console.log(updatedRows);
        return updatedRows;
    }catch (error) {
        console.log("exception");
        console.log(error);
        throw error;
    }
};

export const deleteCustomer = async (id_customer) => {
    try {
        const [updatedRows] = await Customer.update({
            is_active: false
        }, {
            where: {
                id_customer: id_customer
            }
        });
        console.log(updatedRows);
        return updatedRows;
    }catch (error) {
        console.log("exception");
        console.log(error);
        throw error;
    }
};

