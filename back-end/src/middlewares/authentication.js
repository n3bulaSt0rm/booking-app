const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

const publicKey = fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

async function authMiddleware(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        const user = await User.findById(decoded.id);
        if (!user) throw new Error();

        req.user = user;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid keys' });
    }
}

module.exports = authMiddleware;