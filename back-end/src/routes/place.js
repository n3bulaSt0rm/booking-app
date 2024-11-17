const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place');

router.post('/', placeController.uploadPlace);
router.put('/', placeController.updatePlace);
router.get('/', placeController.getAllPlaces);
router.get('/find/:query', placeController.queryPlace);
router.get('/:id', placeController.getPlaceID);
router.delete('/:id', placeController.deletePlace);

module.exports = router;