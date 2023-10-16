import { pool } from '../config/db.js';

export const logMiddleware = async (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const method = req.method;
    const url = req.originalUrl;
    const logLevel = "INFO"; // Por defecto INFO. Puede cambiar si capturas errores.
    const errorMessage = ""; // Por defecto vacío. Puede cambiar si capturas errores.

    try {
        const query = `
            INSERT INTO RegistroLogin (MetodoSolicitud, URLSolicitud, AgenteUsuario, NivelLog, MensajeError) 
            VALUES (?, ?, ?, ?, ?)
        `;
        await pool.query(query, [method, url, userAgent, logLevel, errorMessage]);
    } catch (error) {
        console.error("Error al insertar log en la base de datos:", error);
    }

    next();
}
