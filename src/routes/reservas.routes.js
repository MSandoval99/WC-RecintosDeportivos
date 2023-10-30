import { Router } from 'express';
import { logMiddleware } from '../middleware/log.middleware.js';
import { getAllReservations_ctrl } from '../controllers/reservas.controller.js'

const router = Router();

router.get('/calendario', logMiddleware, getAllReservations_ctrl);

export default router;