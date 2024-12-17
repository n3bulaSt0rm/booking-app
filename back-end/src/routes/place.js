const express = require('express');
const router = express.Router();
const {JwtAuth} = require('../middlewares/authentication');
const placeController = require('../controllers/place');
const feedbackController = require('../controllers/feedback')

router.post('/', JwtAuth, placeController.uploadPlace);
router.put('/', JwtAuth, placeController.updatePlace);
router.get('/', placeController.getAllPlaces);
router.get('/find/:query', placeController.queryPlace);
router.get('/:id', JwtAuth, placeController.getPlaceID);
router.delete('/:id', JwtAuth, placeController.deletePlace);

router.get('/:id/feedback',JwtAuth, feedbackController.getFeedbacks);
router.post('/:id/feedback', JwtAuth, feedbackController.addFeedback);
router.delete('/:id/feedback/:id_feedback', JwtAuth, feedbackController.deleteFeedback);

router.get('/all/by-owner', JwtAuth, placeController.getAllPlacesByOwner);


module.exports = router;