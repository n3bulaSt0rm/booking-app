const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

class AuthService {
  async registerUser({ firstName, lastName, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
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

    return { user, accessToken, refreshToken };
  }

  generateAccessToken(user) {
    return jwt.sign({ id: user._id }, privateKey, { algorithm: 'RS256', expiresIn: '8h' });
  }

  generateRefreshToken(user) {
    // Here you might want to persist the refresh token in a database
    return jwt.sign({ id: user._id }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
  }

  verifyToken(token) {
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  }
}

module.exports = new AuthService();