import { getAllReservations, addSemana } from '../services/reservas.services.js';

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