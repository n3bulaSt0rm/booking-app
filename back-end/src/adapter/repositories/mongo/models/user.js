const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

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

UserSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('User', UserSchema);