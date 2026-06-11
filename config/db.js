import _mysql from 'mysql2'; // Usamos la versión con Promesas

const pool = _mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'ecommerce_demo',
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0,
  enableKeepAlive: false
});

export default pool;
