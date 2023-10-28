import dotenv from 'dotenv';
dotenv.config();

import { createPool } from 'mysql2/promise';
import { AppError } from '../utils/error.handle.js';

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = createPool(dbConfig);

// Función para testear la conexión a la base de datos
pool.getConnection((err, connection) => {
    if (err) {
        let errorMsg = 'Error en la conexión a la base de datos';
        
        if (process.env.NODE_ENV !== 'production') {
            switch (err.code) {
                case 'PROTOCOL_CONNECTION_LOST':
                    errorMsg = 'La conexión a la base de datos fue cerrada.';
                    break;
                case 'ER_CON_COUNT_ERROR':
                    errorMsg = 'La base de datos tiene demasiadas conexiones.';
                    break;
                case 'ECONNREFUSED':
                    errorMsg = 'La conexión a la base de datos fue rechazada.';
                    break;
                default:
                    errorMsg = err.message;
                    break;
            }
        }

        console.error(errorMsg);
        throw new AppError(errorMsg, 500);
    }

    if (connection) connection.release();
    return;
});

export { pool };
