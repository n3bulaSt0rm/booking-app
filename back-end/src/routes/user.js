const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/authentication');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
});

module.exports = router;