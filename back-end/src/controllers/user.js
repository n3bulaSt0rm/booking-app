const authService = require('../services/user');

class UserController {
    async registerUser(req, res) {
        try {
            const user = await authService.registerUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { user, accessToken, refreshToken } = await authService.loginUser(req.body);
            res.json({ user, accessToken, refreshToken });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async refreshAccessToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const decoded = authService.verifyToken(refreshToken);
            const user = await User.findById(decoded.id);
            if (!user) throw new Error('User not found');

            const accessToken = authService.generateAccessToken(user);
            res.json({ accessToken });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();