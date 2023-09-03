import { registerNewUser, loginUser } from '../services/auth.services.js';

const registerCtrl = async (req, res) => {
    try {
        const responseUser = await registerNewUser(req.body);
        if (responseUser.error) {
            return res.status(400).json({ message: responseUser.message });
        }
        res.status(201).json(responseUser);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        const responseUser = await loginUser({ email, password });

        if (responseUser === 'PASSWORD_INCORRECT' || responseUser === 'USER_NOT_FOUND') {
            return res.status(403).json({ message: 'Correo o contraseña incorrectos.' });
        }

        res.json(responseUser);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

export { loginCtrl, registerCtrl };
