// Importa todo el paquete jsonwebtoken
import jwt from 'jsonwebtoken';

// Desestructura las funciones que necesitas
const { sign, verify } = jwt;

const JWT_SECRET = process.env.JWT_SECRET || 'marcopolo12';

const generateToken = (id) => {
  const token = sign({ id }, JWT_SECRET, {
    expiresIn: '2h'
  });
  return token;
}

const verifyToken = (token) => {
  const isOk = verify(token, JWT_SECRET);
  return isOk;
}

export { generateToken, verifyToken };
