const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const PlaceSchema = new Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
       },
        title: { type: String, required: true },
        address: String,
        photos: [String],
        description: String,
        perks: [String],
        extraInfo: String,
        checkIn: { type: Number, min: 0, max: 24 },
        checkOut: { type: Number, min: 0, max: 24 },
        maxGuests: { type: Number, min: 1 },
        price: { type: Number, min: 0 },
    },
    {
        timestamps: true,
    }
);

PlaceSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('Place', PlaceSchema);