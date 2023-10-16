// checkJwt
import { verifyToken } from '../utils/jwt.handle.js';

export const checkJwt = (req, res, next) => {
  try {
    const jwtByUser = req.headers.authorization || '';
    const jwt = jwtByUser.split(' ').pop();
    const isUser = verifyToken(jwt);
    if (!isUser) {
      res.status(401).send('NO_TIENES_UN_JWT_VALIDO');
    } else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    res.status(400).send('SESSION_NO_VALIDA');
  }
}