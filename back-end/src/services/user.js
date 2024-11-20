const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

class AuthService {
  async registerUser(userData) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = new User({
      ...userData,
      password: hashedPassword
    });

    return user.save();
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    user.refreshTokens.push(refreshToken);
    await user.save();

    return { user, accessToken, refreshToken };
  }

  generateAccessToken(user) {
    return jwt.sign({ id: user._id }, privateKey, { algorithm: 'RS256', expiresIn: '8h' });
  }

  generateRefreshToken(user) {
    return jwt.sign({ id: user._id }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
  }

  async refreshAccessToken(refreshToken) {
    const decoded = jwt.verify(refreshToken, publicKey, { algorithms: ['RS256'] });
    const user = await User.findById(decoded.id);

    if (!user || !user.refreshTokens.includes(refreshToken)) {
      throw new Error('Invalid refresh keys');
    }

    const newAccessToken = this.generateAccessToken(user);
    return newAccessToken;
  }

  async logoutUser(userId, refreshToken) {
    const user = await User.findById(userId);
    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    await user.save();
  }
}

module.exports = new AuthService();