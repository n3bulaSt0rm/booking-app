const bookingRouter = require('./booking');

function route(app) {
    app.use('/bookings', bookingRouter);
}

module.exports = route;