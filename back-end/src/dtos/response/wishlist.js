const PlaceResponseDTO = require('./place');

class WishlistResponseDTO {
    constructor(wishlist, places) {
        this.id = wishlist._id;
        this.owner = wishlist.owner;
        this.wishlist = wishlist.wishlist.map(item => {
            const place = places.find(place => place.id.toString() === item.place.toString());
            return { place: new PlaceResponseDTO(place) };
        });
        this.createdAt = wishlist.createdAt;
        this.updatedAt = wishlist.updatedAt;
    }
}

module.exports = WishlistResponseDTO;
