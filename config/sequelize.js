import Sequelize from 'sequelize';

// Configuración de la conexión
const orm = new Sequelize('bdprueba', 'ecommerce_demo', '', 
        {
            host: 'localhost', 
            dialect: 'mysql',
            pool: {
                max: 2,
                idle: 10000,
                acquire: 60000,
            },
        }
    );

export default orm;
