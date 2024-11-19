const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;
const User = new Schema(
    {
        firstName: String,
        lastName: String,
        email: { type: String, unique: true },
        password: String,
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
);

User.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('User', User);