const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/authentication');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
});

module.exports = router;