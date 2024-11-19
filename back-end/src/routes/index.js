const bookingRoutes = require('./booking');
const placeRoutes = require('./place');
// const userRoutes = require('./user');

function initRoutes(app) {
    app.use('/bookings', bookingRoutes);
    app.use('/places', placeRoutes);
    // app.use('/users', userRoutes);
}

module.exports = initRoutes;