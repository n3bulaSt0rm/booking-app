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
        checkIn: Number,
        checkOut: Number,
        maxGuests: Number,
        price: Number,
        feedbacks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Feedback',
            default: []
          }],
    },
    {
        timestamps: true,
    }
);

PlaceSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('Place', PlaceSchema);