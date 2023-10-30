import { pool } from '../config/db.js';
import { InternalServerError } from '../utils/error.handle.js';

export const getAllReservations = async () => {
    try {
        const [reservas] = await pool.query('SELECT * FROM Reserva');
        return reservas;
    } catch (error) {
        throw new InternalServerError('Error al obtener reservas.');
    }
};