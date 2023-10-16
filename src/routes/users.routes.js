import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';
import { checkJwt } from '../middleware/check.middleware.js';
import { logMiddleware } from '../middleware/log.middleware.js';
import { registerValidation } from '../middleware/userValidation.js';

const router = Router();

// Rutas de usuario
router.get('/empleados', checkJwt, logMiddleware, getAllUsers);
router.get('/empleado/:id', checkJwt, logMiddleware, getUserById);
router.post('/empleado', checkJwt, registerValidation, logMiddleware, createUser);
router.put('/empleado/:id', checkJwt, registerValidation, logMiddleware, updateUser);
router.delete('/empleado/:id', checkJwt, logMiddleware, deleteUser);

export default router;
