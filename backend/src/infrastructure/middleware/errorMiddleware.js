import { errors } from '../../config/messages.js';

const errorMiddleware = (err, req, res, next) => {
  console.error(`Erro: ${err.message}`);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: errors.VALIDATION_ERROR,
      details: err.details || [],
    });
  }

  return res.status(500).json({
    message: errors.INTERNAL_SERVER_ERROR,
  });
};

export default errorMiddleware;
