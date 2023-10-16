import { Router } from 'express';
import { loginCtrl, registerCtrl } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation } from '../middleware/userValidation.js';
import { logMiddleware } from '../middleware/log.middleware.js';

const router = Router();

router.post('/register', logMiddleware, registerValidation, registerCtrl);

router.post('/login', logMiddleware, loginValidation, loginCtrl);

export default router;
