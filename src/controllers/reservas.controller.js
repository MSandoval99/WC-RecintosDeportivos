import { getAllReservations } from '../services/reservas.services.js';

export const getAllReservations_ctrl = async (req, res, next) => {
    try {
        const users = await getAllReservations();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
