const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const WishlistSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true},
        placeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }],
    },
    {
        timestamps: true,
    },
);

WishlistSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('Wishlist', WishlistSchema);
