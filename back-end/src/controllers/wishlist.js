const wishlistService = require('../services/wishlist'); // Đảm bảo bạn đã tạo wishlistService
class WishlistController {
    async createWishlist(req, res) {
        try {
            const wishlistData = req.body;
            const wishlist = await wishlistService.createWishlist(wishlistData);
            res.status(201).json(wishlist);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getWishlist(req, res) {
        try {
            const userId = req.user.id;
            const wishlist = await wishlistService.getWishlistByOwnerId(userId);
            if (!wishlist) {
                return res.status(404).json({ message: 'Wishlist not found' });
            }
            res.json(wishlist);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateWishlist(req, res) {
        try {
            const wishlist = await wishlistService.updateWishlist(req.params.id, req.body);
            if (!wishlist) {
                return res.status(404).json({ message: 'Wishlist not found or update failed' });
            }
            res.json(wishlist);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteWishlist(req, res) {
        try {
            const wishlist = await wishlistService.deleteWishlist(req.params.id);
            if (!wishlist) {
                return res.status(404).json({ message: 'Wishlist not found or delete failed' });
            }
            res.status(200).json({ message: 'Wishlist deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new WishlistController();
