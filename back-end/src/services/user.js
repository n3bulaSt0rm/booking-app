const userRepository = require('../adapter/repositories/mongo/user_respository');
const UserResponseDTO = require('../dtos/response/user');

class UserService {
  async createUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const user = await userRepository.create(userData);
    return new UserResponseDTO(user);
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return new UserResponseDTO(user);
  }

  async updateUser(id, updateData) {
    const user = await userRepository.update(id, updateData);
    if (!user) throw new Error('User not found or update failed');
    return new UserResponseDTO(user);
  }

  async deleteUser(id) {
    const user = await userRepository.delete(id);
    if (!user) throw new Error('User not found or delete failed');
    return new UserResponseDTO(user);
  }

  async getAllUsers() {
    const users = await userRepository.findAll();
    return users.map(user => new UserResponseDTO(user));
  }
}

module.exports = new UserService();
