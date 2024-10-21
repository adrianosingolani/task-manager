import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../../infrastructure/repositories/UserRepository.js';
import { errors } from '../../config/messages.js';

class AuthenticateUser {
  constructor(userRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error(errors.INVALID_CREDENTIALS);
    }

    const passwordValid = await bcryptjs.compare(password, user.passwordHash);
    if (!passwordValid) {
      throw new Error(errors.INVALID_CREDENTIALS);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return { token, user };
  }
}

export default AuthenticateUser;
