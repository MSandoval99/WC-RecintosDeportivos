import { pool } from '../config/db.js';
import { InternalServerError } from '../utils/error.handle.js';

export const getAllReservations = async () => {
    try {
        const query = 'SELECT * FROM Reserva WHERE Semana_id_semana = 46';
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

export const addReserva = async ({ Usuarios_ID_usuario, Semana_id_semana, Recinto_id_recinto, Bloque_horario_id_bloque, actividad, carrera }) => {
    try {
        const query = 'INSERT INTO Reserva (Usuarios_ID_usuario, Semana_id_semana, Recinto_id_recinto, Bloque_horario_id_bloque, actividad, carrera) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [Usuarios_ID_usuario, Semana_id_semana, Recinto_id_recinto, Bloque_horario_id_bloque, actividad, carrera]);
        return {
            id: result.insertId,
            Usuarios_ID_usuario,
            Semana_id_semana,
            Recinto_id_recinto,
            Bloque_horario_id_bloque,
            actividad,
            carrera
        };
    } catch (error) {
        throw new InternalServerError('Error al agregar reserva.');
    }
}