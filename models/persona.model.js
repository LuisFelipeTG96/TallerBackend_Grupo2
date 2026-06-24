import {Sequelize, DataTypes} from 'sequelize';
import orm from '../config/sequelize.js';

export const Persona = orm.define('persona', {
    id_persona:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50],
        }
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100],
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 100],
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 20]
        }
    },
    fingreso:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 20],
        }
    }
},{
    freezeTableName: true,
    tableName: 'persona',
    timestamps: false,
});

export const connect = async function() {
    await orm.authenticate();
    console.log("conexion establecida");
}

export const login = async function(objUsuario) {
    console.log("------------model------------");
    const [results]= await orm.query(
            'select u.id_persona, u.email, u.password, u.rol from persona u '+
            'where u.email=? and u.fingreso=true',
            {
                replacements: [objUsuario.email]
            }
        );
    console.log(results);
    return results;
};

export const findById = async function(id_persona) {
    console.log("------------model------------");
    const [results]= await orm.query(
            'select u.id_persona, u.email, u.password, u.rol from persona u '+
            'where u.id_persona=? and u.fingreso=true',
            {
                replacements: [id_persona]
            }
        );
    return results;
};
