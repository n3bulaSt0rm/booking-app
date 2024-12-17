const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const {BasicAuth, JwtAuth} = require('../middlewares/authentication');

router.post('/register', authController.registerUser);
router.post('/otp/verify', authController.verifyOtp);
router.post('/otp/login', authController.loginWithOtp);
router.post('/login', authController.loginUser);
router.post('/login-google', authController.loginWithGoogle);
router.post('/refresh-token', authController.refreshAccessToken);
router.post('/logout', JwtAuth, authController.logoutUser);

router.get('/profile', JwtAuth, (req, res) => {
    res.json(req.user);
});

router.post('/admin/register',BasicAuth, userController.registerAdmin);
router.get('/:id', JwtAuth, userController.getUserById);
router.put('/:id', JwtAuth, userController.updateUser);
router.delete('/:id', JwtAuth, userController.deleteUser);
router.get('/', JwtAuth, userController.getAllUsers);

module.exports = router;