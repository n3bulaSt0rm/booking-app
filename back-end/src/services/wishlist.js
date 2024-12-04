const mongoose = require('mongoose');
const wishlistRepository = require('../adapter/repositories/mongo/wishlist_repository');
const placeRepository = require('../adapter/repositories/mongo/place_repository');
const WishlistResponseDTO = require('../dtos/response/wishlist');
const PlaceResponseDTO = require('../dtos/response/place');

class WishlistService {
    async addPlaceToWishlist(userId, placeId) {
        if (!mongoose.Types.ObjectId.isValid(placeId)) {
            throw new Error('invalid place ID');
        }

        const placeExists = await placeRepository.findById(placeId);
        if (!placeExists) {
            throw new Error('place does not exist');
        }

        const wishlist = await wishlistRepository.findByUserId(userId);

        if (!wishlist) {
            await wishlistRepository.create({
                userId: userId,
                placeIds: [placeId],
            });
        } else {
            if (wishlist.placeIds.includes(placeId)) {
                throw new Error('place already in wishlist');
            }
            const updatedWishlist = await wishlistRepository.update(
                wishlist._id,
                { $addToSet: { placeIds: placeId } }
            );
            if (!updatedWishlist) {
                throw new Error('failed to add place to wishlist');
            }
        }
    }

    async getWishlistByUserId(userId) {
        const wishlist = await wishlistRepository.findByUserId(userId);
        if (!wishlist || !wishlist.placeIds || wishlist.placeIds.length === 0) {
            throw new Error('user has no favorite places');
        }

        const places = await placeRepository.findByIds(wishlist.placeIds);
        const placesDTO = places.map((place) => new PlaceResponseDTO(place));

        return new WishlistResponseDTO(wishlist, placesDTO);
    }

    async removePlaceFromWishlist(userId, placeId) {
        if (!mongoose.Types.ObjectId.isValid(placeId)) {
            throw new Error('invalid place ID');
        }

        const wishlist = await wishlistRepository.findByUserId(userId);
        if (!wishlist || wishlist.placeIds.length === 0) {
            throw new Error('user has no favorite places');
        }

       const updatedPlaceIds = wishlist.placeIds.filter(
            (id) => id.toString() !== placeId.toString()
        );

        if (updatedPlaceIds.length === wishlist.placeIds.length) {
            throw new Error('place not found in wishlist');
        }

       const updatedWishlist = await wishlistRepository.update(wishlist._id, {
            placeIds: updatedPlaceIds,
        });
        if (!updatedWishlist) {
            throw new Error('failed to remove place from wishlist');
        }
    }
}

module.exports = new WishlistService();