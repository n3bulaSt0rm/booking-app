const express = require('express');
const router = express.Router();
const {JwtAuth} = require('../middlewares/authentication');
const bookingController = require('../controllers/booking');

router.delete('/:id', JwtAuth, bookingController.deleteID);
router.get('/', JwtAuth, bookingController.getBookings);
router.post('/', JwtAuth, bookingController.show);

router.get("/all-request", JwtAuth, bookingController.getAllRequestBooking);

module.exports = router;