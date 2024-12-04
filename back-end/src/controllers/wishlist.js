const wishlistService = require('../services/wishlist'); // Đảm bảo bạn đã tạo wishlistService
class WishlistController {
    async addPlaceToWishlist(req, res) {
        try {
            const userId = req.user.id;
            const placeId = req.params.id;
            await wishlistService.addPlaceToWishlist(userId, placeId);
            res.status(200).json({message: "success"});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getWishlist(req, res) {
        try {
            const userId = req.user.id;
            const wishlist = await wishlistService.getWishlistByUserId(userId);
            res.json(wishlist);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async removePlaceFromWishlist(req, res) {
        try {
            const userId = req.user.id;
            const placeId = req.params.id;
            await wishlistService.removePlaceFromWishlist(userId, placeId);
            res.status(200).json({ message: 'success' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new WishlistController();
