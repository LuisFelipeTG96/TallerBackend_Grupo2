import 'dotenv/config';
import _mysql from 'mysql2';

const pool = _mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_demo',
  port: Number(process.env.DB_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0
});

export default pool;
