const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication');
const wishlistController = require('../controllers/wishlist');

router.post('/:id', authMiddleware, wishlistController.addPlaceToWishlist);
router.get('/', authMiddleware, wishlistController.getWishlist);
router.delete('/:id', authMiddleware, wishlistController.removePlaceFromWishlist);

module.exports = router;