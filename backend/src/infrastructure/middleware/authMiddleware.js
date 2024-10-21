import jwt from 'jsonwebtoken';
import { errors } from '../../config/messages.js';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: errors.UNAUTHORIZED });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erro na verificação do JWT:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: errors.TOKEN_EXPIRED });
    }
    return res.status(403).json({ message: errors.INVALID_TOKEN });
  }
};

export default authMiddleware;
