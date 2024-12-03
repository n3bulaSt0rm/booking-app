const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: { type: String, unique: true },
        password: String,
        refreshTokens: [String]
    },
    {
        timestamps: true,
    }
);

UserSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('User', UserSchema);