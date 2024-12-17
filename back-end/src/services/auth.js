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

const privateKey = process.env.PRIVATE_KEY || fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8');
const publicKey = process.env.PUBLIC_KEY || fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

class AuthService {

    async registerUser({ email, password, lastName, firstName }) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) throw new Error('Email already registered');

        const otp = this.generateOtp();
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

    async loginWithOtp({ email }) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('Email not registered');

        const otp = this.generateOtp();

        await cache.set(`user:login:${email}`, JSON.stringify({ email, otp }), 90);
        await emailService.sendOtpEmail(email, otp);

        return { message: 'OTP sent to your email. Please verify to login.' };
    }

    async verifyOtp({ email, otp, context }) {
        const cacheKey = context === 'register' ? `user:register:${email}` : `user:login:${email}`;
        const cachedData = await cache.get(cacheKey);
        if (!cachedData) throw new Error('OTP expired or invalid');

        const cachedOtp = JSON.parse(cachedData).otp;
        if (otp !== cachedOtp) throw new Error('Invalid OTP');

        if (context === 'register') {
            const { password, firstName, lastName } = JSON.parse(cachedData);
            const user = await userRepository.create({
                email,
                password,
                firstName,
                lastName,
                role: 'user',
            });

            await cache.del(cacheKey);

            const accessToken = this.generateAccessToken(user);
            const refreshToken = this.generateRefreshToken(user);

            return new AuthResponseDTO({ accessToken, refreshToken });
        } else if (context === 'login') {
            const user = await userRepository.findByEmail(email);
            if (!user) throw new Error('User not found');

            const accessToken = this.generateAccessToken(user);
            const refreshToken = this.generateRefreshToken(user);

            await cache.del(cacheKey);
            await authRepository.addRefreshToken(user._id, refreshToken);

            return new AuthResponseDTO({ accessToken, refreshToken });
        } else {
            throw new Error('Invalid context for OTP verification');
        }
    }

    generateOtp() {
        return crypto.randomInt(100000, 999999).toString();
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
                throw new Error('Invalid refresh token');
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