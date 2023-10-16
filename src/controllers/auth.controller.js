import { registerNewUser, loginUser } from '../services/auth.services.js';
import { BadRequestError } from '../utils/error.handle.js';
import { validationResult } from 'express-validator';

const registerCtrl = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array().map(error => error.msg).join(', ')));
    }

    try {
        const responseUser = await registerNewUser(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado exitosamente',
            data: responseUser
        });
    } catch (error) {
        next(error);
    }
};

const loginCtrl = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array().map(error => error.msg).join(', ')));
    }

    try {
        const { Correo, Contrasenna } = req.body;
        const responseUser = await loginUser({ Correo, Contrasenna });
        
        if (responseUser.error) {
            throw new BadRequestError('Credenciales incorrectas.');
        }

        // Filtra la contraseña del usuario antes de enviarla
        const userWithoutPassword = { ...responseUser.user };
        delete userWithoutPassword.Contrasenna;

        res.json({
            token: responseUser.token,
            user: userWithoutPassword
        });
    } catch (error) {
        next(error);
    }
}

export { loginCtrl, registerCtrl };