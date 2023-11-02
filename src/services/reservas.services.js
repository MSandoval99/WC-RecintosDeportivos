import { pool } from '../config/db.js';
import { InternalServerError } from '../utils/error.handle.js';

export const getAllReservations = async () => {
    try {
        const query = 'SELECT * FROM Reserva WHERE Semana_id_semana = 44';
        const [reservas] = await pool.query(query);
        return reservas;
    } catch (error) {
        throw new InternalServerError('Error al obtener reservas de la semana 3.');
    }
};

export const addSemana = async ({ fecha_inicio, fecha_fin, mes, annio }) => {
    try {
        const query = 'INSERT INTO Semana (fecha_inicio, fecha_fin, mes, annio) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [fecha_inicio, fecha_fin, mes, annio]);
        return {
            id: result.insertId,
            fecha_inicio,
            fecha_fin,
            mes,
            annio
        };
    } catch (error) {
        throw new InternalServerError('Error al agregar semana.');
    }
};