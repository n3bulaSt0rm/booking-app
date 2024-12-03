const mongoose = require('mongoose');
const Place = require('./models/place');

class PlaceRepository {
    async create(data) {
        const place = new Place(data);
        return place.save();
    }

    async findById(id) {
        return Place.findById(id);
    }

    async findByIds(ids) {
        const objectIds = ids.map(id => new mongoose.Types.ObjectId(id));
        return Place.find({ '_id': { $in: objectIds } });
    }


    async update(id, data) {
        return Place.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return Place.findByIdAndDelete(id);
    }

    async findAll() {
        return Place.find();
    }
}

module.exports = new PlaceRepository();
