import { pool } from '../config/db.js';
import { InternalServerError } from '../utils/error.handle.js';

export const getAllReservations = async () => {
    try {
        const query = 'SELECT * FROM Reserva WHERE Semana_id_semana = 3';
        const [reservas] = await pool.query(query);
        return reservas;
    } catch (error) {
        throw new InternalServerError('Error al obtener reservas de la semana 3.');
    }
};
