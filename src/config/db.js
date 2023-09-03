import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'apokaliptiko13',
    port: 3307,
    database: 'companydb'
})