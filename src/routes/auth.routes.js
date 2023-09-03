import { Router } from 'express'; // Importando el enrutador de Express
import { loginCtrl, registerCtrl } from '../controllers/auth.controller.js';

const router = Router(); // Creando el enrutador

// Ruta para registrar un nuevo usuario
router.post('/register', registerCtrl);
router.post('/login', loginCtrl);

export default router;