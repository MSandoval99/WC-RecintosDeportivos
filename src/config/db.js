import { createPool } from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'apokaliptiko13',
    port: 3307,
    database: 'proyecto_04',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = createPool(dbConfig);

// Función para testear la conexión a la base de datos
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión a la base de datos fue cerrada.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene demasiadas conexiones.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexión a la base de datos fue rechazada.');
        }
    }
    if (connection) connection.release();

    return;
});

export { pool };


