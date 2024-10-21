import Joi from 'joi';
import RegisterUser from '../../application/useCases/RegisterUser.js';
import UserRepository from '../repositories/UserRepository.js';
import AuthenticateUser from '../../application/useCases/AuthenticateUser.js';
import { success, errors } from '../../config/messages.js';

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.registerUser = new RegisterUser(this.userRepository);
    this.authenticateUser = new AuthenticateUser(this.userRepository);
  }

  async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      const user = await this.registerUser.execute(value);

      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        message: success.USER_REGISTERED,
      });
    } catch (err) {
      console.error('Erro no registro do usuário:', err);
      if (err.message === errors.EMAIL_IN_USE) {
        return res.status(409).json({ message: errors.EMAIL_IN_USE });
      }
      return res.status(500).json({ message: errors.INTERNAL_SERVER_ERROR });
    }
  }

  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      const { token, user } = await this.authenticateUser.execute(value);

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        message: success.USER_LOGGED_IN,
      });
    } catch (err) {
      console.error('Erro na autenticação do usuário:', err);
      if (err.message === errors.INVALID_CREDENTIALS) {
        return res.status(401).json({ message: errors.INVALID_CREDENTIALS });
      }
      return res.status(500).json({ message: errors.INTERNAL_SERVER_ERROR });
    }
  }

  async logout(req, res, next) {
    try {
      res.cookie('jwt', '', { maxAge: 1 });

      return res.status(200).json({ message: success.USER_LOGGED_OUT });
    } catch (err) {
      console.error('Erro no logout:', err);
      return res.status(500).json({ message: errors.INTERNAL_SERVER_ERROR });
    }
  }

  async me(req, res, next) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      res.json({ user: req.user });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user profile' });
    }
  }
}

export default UserController;
