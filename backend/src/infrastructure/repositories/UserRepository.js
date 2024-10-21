import UserModel from '../models/UserModel.js';

class UserRepository {
  async save(user) {
    const createdUser = await UserModel.create({
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    return createdUser;
  }

  async findByEmail(email) {
    return await UserModel.findOne({ where: { email } });
  }
}

export default UserRepository;