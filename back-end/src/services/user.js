const userRepository = require('../adapter/repositories/mongo/user_respository');

class UserService {
  async createUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    return await userRepository.create(userData);
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateUser(id, updateData) {
    const user = await userRepository.update(id, updateData);
    if (!user) throw new Error('User not found or update failed');
    return user;
  }

  async deleteUser(id) {
    const user = await userRepository.delete(id);
    if (!user) throw new Error('User not found or delete failed');
    return user;
  }

  async getAllUsers() {
    return await userRepository.findAll();
  }
}

module.exports = new UserService();