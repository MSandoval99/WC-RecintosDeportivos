import { pool } from '../config/db.js';
import { encrypt, verified } from '../utils/bcrypt.handle.js';
import { generateToken } from '../utils/jwt.handle.js';
import { BadRequestError } from '../utils/error.handle.js';

const registerNewUser = async (user) => {
    try {
        const { Nombres, Apellidos, Rut, Correo, Contrasenna, Celular, Fecha_nac, Genero, Foto, ID_rol } = user;
        
        const [existingUsers] = await pool.query('SELECT Correo FROM Usuarios WHERE Correo = ?', [Correo]);
        if (existingUsers.length > 0) throw new BadRequestError('El usuario ya existe.');

        const passHash = await encrypt(Contrasenna);
        const query = `
            INSERT INTO Usuarios 
                (Nombres, Apellidos, Rut, Correo, Contrasenna, Celular, Fecha_nac, Genero, Foto, ID_rol) 
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [Nombres, Apellidos, Rut, Correo, passHash, Celular, Fecha_nac, Genero, Foto, ID_rol]);
        
        if (!result.insertId) throw new BadRequestError('No se pudo registrar al usuario.');

        return {
            id: result.insertId,
            Correo,
            Nombres,
            Apellidos,
            Rut,
            Celular,
            Fecha_nac,
            Genero,
            Foto,
            ID_rol
        };
        
    } catch (error) {
        throw error;
    }
};


const loginUser = async ({ Correo, Contrasenna }) => {
    try {
        const [users] = await pool.query('SELECT * FROM Usuarios WHERE Correo = ?', [Correo]);
        if (users.length === 0) throw new BadRequestError('Credenciales incorrectas.');

        const user = users[0];
        const isCorrect = await verified(Contrasenna, user.Contrasenna);
        if (!isCorrect) throw new BadRequestError('Credenciales incorrectas.');

        const token = generateToken(user.Correo);
        return {
            token,
            user
        };

    } catch (error) {
        throw error;
    }
};

export { registerNewUser, loginUser };
