const bookingRouter = require('./booking');
const placeRouter = require('./place');
const userRouter = require('./user');
const wishlistRouter = require('./wishlist');

function initRoutes(app) {
    app.use('/bookings', bookingRouter);
    app.use('/place', placeRouter);
    app.use('/user', userRouter);
    app.use('/wishlist', wishlistRouter);
}

module.exports = initRoutes;
