const Wishlist = require('./models/wishlist');

class WishlistRepository {
    async create(wishlistData) {
        return new Wishlist(wishlistData).save();
    }

    async update(id, updateData) {
        return Wishlist.findByIdAndUpdate(id, updateData, {
            new: true,
            upsert: false,
        });
    }

    async findByUserId(userId) {
        return Wishlist.findOne({ userId });
    }

    async delete(id) {
        return Wishlist.findByIdAndDelete(id);
    }
}

module.exports = new WishlistRepository();