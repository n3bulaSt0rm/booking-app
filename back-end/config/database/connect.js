const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:admin123@booking.wku5jbx.mongodb.net/',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('MongoBD connected');
    } catch (error) {
        console.log('MongoBD connect failed');
    }
}

module.exports = { connect };
