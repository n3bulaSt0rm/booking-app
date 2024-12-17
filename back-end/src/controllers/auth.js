const authService = require('../services/auth');

class AuthController {
    async registerUser(req, res) {
        try {
            const user = await authService.registerUser(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async verifyOtp(req, res) {
        try{
            const user = await authService.verifyOtp(req.body);
            res.status(200).json(user);
        } catch(error){
            res.status(400).json({ message: error.message });
        }
    }

    async loginWithOtp(req, res) {
        try{
            const user = await authService.loginWithOtp(req.body);
            res.status(200).json(user);
        } catch(error){
            res.status(400).json({ message: error.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { user, accessToken, refreshToken } = await authService.loginUser(req.body);
            res.status(200).json({ user, accessToken, refreshToken });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async refreshAccessToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const newAccessToken = await authService.refreshAccessToken(refreshToken);
            res.status(200).json({ accessToken: newAccessToken });
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

module.exports = new AuthController();