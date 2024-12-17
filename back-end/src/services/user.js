const userRepository = require('../adapter/repositories/mongo/user_respository');
const UserResponseDTO = require('../dtos/response/user');
const bcrypt = require("bcrypt");

class UserService {
  async registerAdmin({username, password, firstName, lastName}) {
    const existingUser = await userRepository.findByEmail(username);
    if (existingUser) {
      throw new Error('Username already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const user = await userRepository.create({
      email: username,
      password: await bcrypt.hash(password, salt),
      firstName,
      lastName,
      role: 'admin',
    });
    return { message: 'Registered successfully.' };
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
