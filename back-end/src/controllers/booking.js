const Booking = require('../models/booking');

class BookingController {
    //[POST] /booking
    async show(req, res) {
        try {
            const {id, place, checkIn, checkOut, numberOfGuests, phone, price, name } = req.body;
            const booking = await Booking.create({
                place,
                checkIn,
                checkOut,
                numberOfGuests,
                phone,
                price,
                name, 
                user: id, 
            });

            res.json(booking);
        } catch (err) {
            res.status(500).json({ message: 'Có lỗi xảy ra khi tạo booking', error: err.message });
        }
    }


    //[Get] /booking
    async getBookings(req, res) {
        const { id } = req.params;  
        try {
            const bookings = await Booking.find({ user: id }).populate('place');
            if (bookings.length === 0) {
                return res.status(404).json({ message: 'Không tìm thấy booking cho người dùng này.' });
            }
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi truy xuất bookings', error });
        }
    }

    //[DELETE] /booking/:id
    async deleteID(req, res) {
        const { id } = req.params;
        res.json(await Booking.deleteOne({ _id: id }));
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