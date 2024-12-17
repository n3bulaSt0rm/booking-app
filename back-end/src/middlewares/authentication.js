const jwt = require('jsonwebtoken');
const User = require('../adapter/repositories/mongo/models/user');
const UserResponseDTO = require('../dtos/response/user');
const fs = require('fs');
const path = require('path');

const publicKey = process.env.PUBLIC_KEY || fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8');

const ADMIN_SERVICE_USERNAME = process.env.ADMIN_SERVICE_USERNAME || 'test123';
const ADMIN_SERVICE_PASSWORD = process.env.ADMIN_SERVICE_PASSWORD || 'test123';


function BasicAuth(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Access denied. No Basic Authentication header provided.' });
    }

    try {
        const base64Credentials = authHeader.replace('Basic ', '');
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        if (
            username === ADMIN_SERVICE_USERNAME &&
            password === ADMIN_SERVICE_PASSWORD
        ) {
            return next();
        }

        return res.status(401).json({ message: 'Invalid Basic Authentication credentials.' });
    } catch (error) {
        return res.status(401).json({ message: 'Failed to process Basic Authentication.' });
    }
}

async function JwtAuth(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No Bearer token provided.' });
    }

    try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        req.user = new UserResponseDTO(user);
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = { BasicAuth, JwtAuth };