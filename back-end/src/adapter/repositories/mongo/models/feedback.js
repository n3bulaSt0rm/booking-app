const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');

function generateSlugFromDate(date) {
    const formattedDate = date.toISOString().replace(/[-:]/g, '').split('.')[0]; // Định dạng YYYYMMDDHHMMSS
    return formattedDate;
}

const FeedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: { 
        type: String,
        unique: true,
        default: function () {
            return generateSlugFromDate(this.date);  // Tạo slug từ date
        }
    },
}, {
    timestamps: true, 
});

mongoose.plugin(slug);  
FeedbackSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Feedback', FeedbackSchema);
