const express = require('express');
const router = express.Router();
const {JwtAuth} = require('../middlewares/authentication');
const wishlistController = require('../controllers/wishlist');

router.post('/:id',JwtAuth , wishlistController.addPlaceToWishlist);
router.get('/', JwtAuth, wishlistController.getWishlist);
router.delete('/:id', JwtAuth, wishlistController.removePlaceFromWishlist);

module.exports = router;