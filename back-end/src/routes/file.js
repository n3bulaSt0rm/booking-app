const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file');
const {JwtAuth} = require('../middlewares/authentication');
const uploadMiddleware = require('../middlewares/upload');

router.put('/upload', JwtAuth, uploadMiddleware.array('image', 10), fileController.uploadFiles);

module.exports = router;