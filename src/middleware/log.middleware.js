// logMiddleware
import { verifyToken } from '../path_to_jwt.handle.js';

export const logMiddleware = (req, res, next) => {
  const header = req.headers;
  const userAgent = header['user-agent'];
  console.log('user-agent', userAgent);
  next();
}
