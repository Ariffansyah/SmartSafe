import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_user,
    password: process.env.DB_password,
    host: process.env.DB_host,
    port: Number(process.env.DB_port),
    database: process.env.DB_database,
});

export default pool;
