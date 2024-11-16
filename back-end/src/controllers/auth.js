const user = require('../models/user');
// const Place = require('../models/Place');
// const Feedback = require('../models/Feedback');
// const Booking = require('../models/Booking')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'awuichaiuwchasasdwd123';
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class SiteController {
    /* //[Get] /news
    index(req, res, next) {
        Place.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch((err) => {
                res.status(400).json({ error: 'Error' });
                console.log(err);
            });
    } */

    //[POST] /register
    async register(req, res) {
        const { firstName, lastName, email, password } = req.body;
        try {
            const userDoc = await user.create({
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, bcryptSalt),
            });
            res.json(userDoc);
        } catch (e) {
            res.status(422).json(e);
        }
    }
}
