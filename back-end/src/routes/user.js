const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/authentication');

router.post('/register', authController.registerUser);
router.post('/otp/verify', authController.verifyOtp);
router.post('/otp/login', authController.loginWithOtp);
router.post('/login', authController.loginUser);
router.post('/refresh-token', authController.refreshAccessToken);
router.post('/logout', authMiddleware, authController.logoutUser);

router.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
});

router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;