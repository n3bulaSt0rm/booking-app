const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const BookingSchema = new Schema(
    {
        placeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Place',
        },
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            required: true, 
            ref: "User" 
        },
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        price: Number,
    },
    {
        timestamps: true,
    },
);

BookingSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('Booking', BookingSchema);