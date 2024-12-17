const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file');
const authMiddleware = require('../middlewares/authentication');
const uploadMiddleware = require('../middlewares/upload');

router.put('/upload', authMiddleware, uploadMiddleware.array('image', 10), fileController.uploadFiles);

module.exports = router;