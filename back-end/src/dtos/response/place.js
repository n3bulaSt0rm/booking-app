class PlaceResponseDTO {
    constructor(place) {
        this.id = place._id;
        this.title = place.title;
        this.address = place.address;
        this.photos = place.photos;
        this.description = place.description;
        this.perks = place.perks;
        this.extraInfo = place.extraInfo;
        this.checkIn = place.checkIn;
        this.checkOut = place.checkOut;
        this.maxGuests = place.maxGuests;
        this.price = place.price;
        this.createdAt = place.createdAt;
        this.updatedAt = place.updatedAt;
    }
}

module.exports = PlaceResponseDTO;
