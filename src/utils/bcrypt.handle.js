// Importa todo el módulo bcryptjs
import bcrypt from 'bcryptjs';

// Desestructura las funciones que necesitas
const { hash, compare } = bcrypt;

// El resto del código permanece igual
const encrypt = async (pass) => {
    const passwordHash = await hash(pass, 8);
    return passwordHash;
}

const verified = async (pass, passHash) => {
    const isCorrect = await compare(pass, passHash);
    return isCorrect;
}

export { encrypt, verified };

