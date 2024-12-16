const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const path = require('path');
const emailService = require('../adapter/http/google/mail');
const cache = require('../adapter/cache/redis');
const userRepository = require('../adapter/repositories/mongo/user_respository');
const authRepository = require('../adapter/repositories/mongo/auth_repository');
const AuthResponseDTO = require('../dtos/response/auth');
const UserResponseDTO = require('../dtos/response/user');

const privateKey = process.env.PRIVATE_KEY || fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8');
const publicKey = process.env.PUBLIC_KEY || fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

class AuthService {

    async registerUser({ email, password, lastName, firstName }) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) throw new Error('Email already registered');

        const lastRequest = await cache.get(`user:register:${email}`);
        // if (lastRequest) {
        //     throw new Error('You can only request register once every 90 seconds.');
        // }

        const otp = crypto.randomInt(100000, 999999).toString();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await cache.set(
            `user:register:${email}`,
            JSON.stringify({ email, password: hashedPassword, otp, lastName, firstName }),
            90
        );


        await emailService.sendOtpEmail(email, otp);

        return { message: 'OTP sent to your email. Please verify to complete registration.' };
    }
    async registerAdmin({ email, password, lastName, firstName }) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) throw new Error('Email already registered');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const role = "admin"
        const user = await userRepository.create({ email, hashedPassword, lastName, firstName , role});
        return {message: 'Registered successfully'};

    }


    async verifyOtp({ email, otp }) {
        const cachedData = await cache.get(`user:register:${email}`);
        if (!cachedData) throw new Error('OTP expired or invalid');

        const { password, otp: cachedOtp, lastName, firstName } = JSON.parse(cachedData);

        if (otp !== cachedOtp) throw new Error('Invalid OTP');
        const role = "user"
        const user = await userRepository.create({ email, password, lastName, firstName , role});
        await cache.del(`user:register:${email}`);

        return {message: 'Registered successfully'};
    }

    async loginUser({ email, password }) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('Invalid email or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid email or password');

        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);

        await authRepository.addRefreshToken(user._id, refreshToken);

        return new AuthResponseDTO({  accessToken, refreshToken });
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