import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';
import { Category } from './category.model.js';

export const Product = orm.define('Product', {
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'product_id'
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { len: [0, 30] }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [1, 120] }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { len: [0, 255] }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    archivo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { len: [0, 100] }
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

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

export const getAllProducts = async () => {
    console.log("------------model------------");
    const results = await Product.findAll({
        include: [Category],
        where: { is_active: true }
    });
    return results.map(u => u.toJSON());
};

export const getProductById = async (id_product) => {
    console.log("------------model------------");
    const result = await Product.findAll({
        include: [Category],
        where: { id_product: id_product, is_active: true }
    });
    return result.map(u => u.toJSON());
};

export const createProduct = async (objProduct) => {
    try {
        const result = await Product.create({
            category_id: objProduct.category_id,
            sku: objProduct.sku,
            name: objProduct.name,
            description: objProduct.description,
            price: objProduct.price,
            stock: objProduct.stock
        });
        return result.toJSON().id_product;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateProduct = async (id_product, objProduct) => {
    try {
        const [updatedRows] = await Product.update({
            sku: objProduct.sku,
            name: objProduct.name,
            description: objProduct.description,
            price: objProduct.price,
            stock: objProduct.stock,
            updated_at: new Date()
        }, {
            where: { id_product: id_product }
        });
        return updatedRows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteProduct = async (id_product) => {
    try {
        const [updatedRows] = await Product.update({
            is_active: false
        }, {
            where: { id_product: id_product }
        });
        return updatedRows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateArchivo = async (id_product, filename) => {
    try {
        const [updatedRows] = await Product.update({
            archivo: filename
        }, {
            where: { id_product: id_product }
        });
        return updatedRows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const downloadArchivo = async (id_product) => {
    const result = await Product.findOne({
        where: { id_product: id_product }
    });
    if (!result) return null;
    return 'uploads/' + result.toJSON().archivo;
};
