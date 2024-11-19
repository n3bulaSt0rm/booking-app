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
            const newAccessToken = await authService.refreshAccessToken(refreshToken);
            res.json({ accessToken: newAccessToken });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async logoutUser(req, res) {
        try {
            const { refreshToken } = req.body;
            await authService.logoutUser(req.user.id, refreshToken);
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();