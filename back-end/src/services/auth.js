const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const userRepository = require('../adapter/repositories/mongo/user_respository');
const authRepository = require('../adapter/repositories/mongo/auth_repository');

const privateKey = process.env.PRIVATE_KEY || fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8');
const publicKey = process.env.PUBLIC_KEY || fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

class AuthService {
    async registerUser(userData) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        return await userRepository.create({ ...userData, password: hashedPassword });
    }

    async loginUser({ email, password }) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid email or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid email or password');

        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);

        await authRepository.addRefreshToken(user._id, refreshToken);

        return { user, accessToken, refreshToken };
    }

    generateAccessToken(user) {
        return jwt.sign({ id: user._id, role: user.role }, privateKey, {
            algorithm: 'RS256',
            expiresIn: '8h',
        });
    }

    generateRefreshToken(user) {
        return jwt.sign({ id: user._id }, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d',
        });
    }

    async refreshAccessToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, publicKey, { algorithms: ['RS256'] });
            const user = await userRepository.findById(decoded.id);

            if (!user || !user.refreshTokens.includes(refreshToken)) {
                throw new Error('Invalid refresh tokens');
            }

            return this.generateAccessToken(user);
        } catch (err) {
            throw new Error('Invalid or expired refresh token');
        }
    }

    async logoutUser(userId, refreshToken) {
        await authRepository.removeRefreshToken(userId, refreshToken);
    }
}

module.exports = new AuthService();