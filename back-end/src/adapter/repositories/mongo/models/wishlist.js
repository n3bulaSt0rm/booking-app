const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const WishlistSchema = new Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        wishlist: [
            {
                place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
            },
        ],
    },
    {
        timestamps: true,
    },
);

WishlistSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('WishList', WishlistSchema);
