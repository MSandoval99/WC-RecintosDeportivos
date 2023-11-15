import { getAllReservations, addSemana, addReserva } from '../services/reservas.services.js';

export const getAllReservations_ctrl = async (req, res, next) => {
    try {
        const users = await getAllReservations();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const addSemana_ctrl = async (req, res, next) => {
    try{
        const { fecha_inicio, fecha_fin, mes, annio } = req.body;
        const responseUser = await addSemana({ fecha_inicio, fecha_fin, mes, annio });

        res.json({
            status: 'success',
            message: 'Semana agregada exitosamente',
            data: responseUser
        })
    } catch (error) {
        next(error);
    }
}

export const addReservaCtrl = async (req, res, next) => {
    try{
        const { Usuarios_ID_usuario, Semana_id_semana, Recinto_id_recinto, Bloque_horario_id_bloque, actividad, carrera } = req.body;
        const responseUser = await addReserva({ Usuarios_ID_usuario, Semana_id_semana, Recinto_id_recinto, Bloque_horario_id_bloque, actividad, carrera });

        res.json({
            status: 'success',
            message: 'Reserva agregada exitosamente',
            data: responseUser
        });
    } catch (error) {
        next(error);
    }
}