import bcryptjs from 'bcryptjs';
import User from '../../domain/entities/User.js';
import UserRepository from '../../infrastructure/repositories/UserRepository.js';
import { errors } from '../../config/messages.js';

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async execute({ name, email, password }) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error(errors.EMAIL_IN_USE);
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const user = new User({ name, email, passwordHash });

    await this.userRepository.save(user);

    return user;
  }
}

export default RegisterUser;