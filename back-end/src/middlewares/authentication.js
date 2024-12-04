const jwt = require('jsonwebtoken');
const User = require('../adapter/repositories/mongo/models/user');
const UserResponseDTO = require('../dtos/response/user');
const fs = require('fs');
const path = require('path');

const publicKey = process.env.PUBLIC_KEY || fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

async function authMiddleware(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        const user = await User.findById(decoded.id);
        if (!user) throw new Error('User not found');

        req.user = new UserResponseDTO(user);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}
//
module.exports = authMiddleware;