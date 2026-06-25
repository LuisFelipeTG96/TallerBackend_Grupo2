import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';

export const Category = orm.define('Category', {
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'category_id'
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
    tableName: 'categories',
    timestamps: false
});

