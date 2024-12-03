const userRepository = require('./user_respository');

class AuthRepository {
    async addRefreshToken(userId, refreshToken) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error('User not found');

        user.refreshTokens.push(refreshToken);
        await user.save();
    }

    async removeRefreshToken(userId, refreshToken) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error('User not found');

        user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
        await user.save();
    }
}

module.exports = new AuthRepository();