import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lynchareadb',
  password: '123',
  port: 5432
});

export default pool;
