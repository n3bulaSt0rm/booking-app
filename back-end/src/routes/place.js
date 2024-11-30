const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication');
const placeController = require('../controllers/place');

router.post('/', authMiddleware, placeController.uploadPlace);
router.put('/', authMiddleware, placeController.updatePlace);
router.get('/', authMiddleware, placeController.getAllPlaces);
router.get('/find/:query', authMiddleware, placeController.queryPlace);
router.get('/:id', authMiddleware, placeController.getPlaceID);
router.delete('/:id', authMiddleware, placeController.deletePlace);

module.exports = router;