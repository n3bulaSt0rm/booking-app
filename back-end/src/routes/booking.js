const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking');

router.delete('/:id', bookingController.deleteID);
router.get('/:id', bookingController.getBookings);
router.post('/', bookingController.show);

module.exports = router;