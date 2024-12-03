const User = require('./models/user');

class UserRepository {
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findById(id) {
        return await User.findById(id);
    }

    async update(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    async findAll() {
        return await User.find();
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = new UserRepository();