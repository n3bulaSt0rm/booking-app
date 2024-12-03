const wishlistRepository = require('../adapter/repositories/mongo/wishlist_repository');
const placeRepository = require('../adapter/repositories/mongo/place_repository');
const WishlistResponseDTO = require('../dtos/response/wishlist');
const PlaceResponseDTO = require('../dtos/response/place');

class WishlistService {
    async createWishlist(wishlistData) {
        const wishlist = await wishlistRepository.create(wishlistData);
        return new WishlistResponseDTO(wishlist);
    }

    async getWishlistByOwnerId(ownerId) {
        const wishlist = await wishlistRepository.findByOwner(ownerId);
        if (!wishlist) throw new Error('Wishlist not found');

        const placeIds = wishlist.wishlist.map(item => item.place);

        const places = await placeRepository.findByIds(placeIds);

        const placesDTO = places.map(place => new PlaceResponseDTO(place));

        return new WishlistResponseDTO(wishlist, placesDTO);
    }

    async updateWishlist(id, updateData) {
        const wishlist = await wishlistRepository.update(id, updateData);
        if (!wishlist) throw new Error('Wishlist not found or update failed');
        return new WishlistResponseDTO(wishlist);
    }

    async deleteWishlist(id) {
        const wishlist = await wishlistRepository.delete(id);
        if (!wishlist) throw new Error('Wishlist not found or delete failed');
        return new WishlistResponseDTO(wishlist);
    }

    async getAllWishlists() {
        const wishlists = await wishlistRepository.findAll();
        return wishlists.map(wishlist => new WishlistResponseDTO(wishlist));
    }
}

module.exports = new WishlistService();
