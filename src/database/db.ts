import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// const poolConfig: PoolConfig = {
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT || '5432'),
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
// };

const poolConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' ? proConfig : poolConfig
});

export default pool;