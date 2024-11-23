const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication');
const bookingController = require('../controllers/booking');

router.delete('/:id', authMiddleware, bookingController.deleteID);
router.get('/', authMiddleware, bookingController.getBookings);
router.post('/', authMiddleware, bookingController.show);

module.exports = router;