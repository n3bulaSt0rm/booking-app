const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication');
const wishlistController = require('../controllers/wishlist');

router.post('/', authMiddleware, wishlistController.createWishlist);
router.get('/:id', authMiddleware, wishlistController.getWishlistById);
router.get('/', authMiddleware, wishlistController.getAllWishlists);
router.put('/', authMiddleware, wishlistController.updateWishlist);
router.delete('/:id', authMiddleware, wishlistController.deleteWishlist);

module.exports = router;