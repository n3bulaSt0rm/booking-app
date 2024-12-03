const Wishlist = require('./models/wishlist');
const mongoose =require('mongoose');

class WishlistRepository {
    async create(wishlistData) {
        const wishlist = new Wishlist(wishlistData);
        return await wishlist.save();
    }

    async update(id, updateData) {
        return await Wishlist.findByIdAndUpdate(id, updateData, { new: true });  // Update and return the updated wishlist
    }

    async findByOwner(ownerId) {
        return await Wishlist.findOne({ owner: ownerId });
    }

    async findAll() {
        return await Wishlist.find();
    }

    async delete(id) {
        return await Wishlist.findByIdAndDelete(id);
    }

}

module.exports = new WishlistRepository();