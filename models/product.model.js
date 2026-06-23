import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';
import { Category } from './category.model.js';

export const Product = orm.define('Product', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 120]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 0
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    freezeTableName: true,
    tableName: 'products',
    timestamps: false
});

Category.hasMany(Product, { foreignKey: 'id_category' });
Product.belongsTo(Category, { foreignKey: 'id_category' });

export const connect = async () => {
    await orm.authenticate();
    console.log("Conexion establecida");
}

export const getAllProducts = async () => {
    console.log("------------model------------");
    const results = await Product.findAll({
        include: [Category],
        where: {
            is_active: true
        }
    });
    
    console.log(results);
    return results.map(u => u.toJSON());
};

export const getProductById = async (id_product) => {
    console.log("------------model------------");
    const result = await Product.findAll({
        include: [Category],
        where: {
            id_product: id_product,
            is_active: true
        }
    });
    console.log(result);
    return result.map(u => u.toJSON());
};

export const createProduct = async (objProduct, id_category) => {
    try {
        console.log("------------model------------");
        const result = await Product.create({
            name: objProduct.name,
            description: objProduct.description,
            price: objProduct.price,
            stock: objProduct.stock,
            id_category: id_category
        });
        console.log(result);
        return result.toJSON();
    } catch (error) {
        console.log("exception");
        console.log(error);
        throw error;
    }
};

export const updateProduct = async (id_product, objProduct) => {
    try {
        const [updatedRows] = await Product.update({
            name: objProduct.name,
            description: objProduct.description,
            price: objProduct.price,
            stock: objProduct.stock,
            updated_at: new Date()
        }, {
            where: {
                id_product: id_product
            }
        });
        console.log(updatedRows);
        return updatedRows;
    } catch (error) {
        console.log("exception");
        console.log(error);
        throw error;
    }
};

export const deleteProduct = async (id_product) => {
    try {
        const [updatedRows] = await Product.update({
            is_active: false
        }, {
            where: {
                id_product: id_product
            }
        });
        console.log(updatedRows);
        return updatedRows;
    } catch (error) {
        console.log("exception");
        console.log(error);
        throw error;
    }
};