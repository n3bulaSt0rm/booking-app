const bookingRouter = require('./booking');
const placeRouter = require('./place');
const userRouter = require('./user');
const wishlistRouter = require('./wishlist');
const fileRouter = require('./file');

function initRoutes(app) {
    app.use('/booking', bookingRouter);
    app.use('/place', placeRouter);
    app.use('/user', userRouter);
    app.use('/wishlist', wishlistRouter);
    app.use('/file', fileRouter);
}

module.exports = initRoutes;
