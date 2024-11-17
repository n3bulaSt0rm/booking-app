const Booking = require('../models/booking');

class BookingController {
    //[POST] /booking
    async show(req, res) {
        //verify
        Booking.create({
            place,
            checkIn,
            checkOut,
            numberOfGuests,
            phone,
            price,
            user: userData.id,
        })
        try{
            res.json(doc);
        }
        catch{
            throw err;
        }
    }

    //[Get] /booking
    async getBookings(req, res) {
            res.json(
                await Booking.find({ user: userData.id }).populate('place'),
            );
    }

    //[DELETE] /booking/:id
    async deleteID(req, res) {
        const { id } = req.params;
        res.json(await Booking.deleteOne({ user: userData.id, _id: id }));
    }

    async bookingManager(req, res) {
        const ownerId = userData.id;
        const places = await Place.find({ owner: ownerId });
        const placeIds = places.map(place => place._id);
        res.json(await Booking.find({
            place: {
                $in: placeIds
            }
        }).populate('place').populate('user'))
    }

    
}

module.exports = new BookingController();
