import _mysql from 'mysql2'; // Usamos la versión con Promesas

const pool = _mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce_demo',
  waitForConnections: true,
  connectionLimit: 8,
  queueLimit: 0
});

export default pool;
