const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication');
const placeController = require('../controllers/place');
const feedbackController = require('../controllers/feedback')

router.post('/', authMiddleware, placeController.uploadPlace);
router.put('/', authMiddleware, placeController.updatePlace);
router.get('/', authMiddleware, placeController.getAllPlaces);
router.get('/find/:query', authMiddleware, placeController.queryPlace);
router.get('/:id', authMiddleware, placeController.getPlaceID);
router.delete('/:id', authMiddleware, placeController.deletePlace);

router.get('/:id/feedback',authMiddleware, feedbackController.getFeedbacks);
router.post('/:id/feedback', authMiddleware, feedbackController.addFeedback);
router.delete('/:id/feedback/:id_feedback', authMiddleware, feedbackController.deleteFeedback);

router.get('/all/by-owner', authMiddleware, placeController.getAllPlacesByOwner);


module.exports = router;