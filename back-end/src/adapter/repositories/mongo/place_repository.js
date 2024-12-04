const mongoose = require('mongoose');
const Place = require('./models/place');

class PlaceRepository {
    async create(data) {
        return new Place(data).save();
    }

    async findById(id) {
        return Place.findById(id);
    }

    async findByIds(ids) {
        return Place.find({ _id: { $in: ids } });
    }

    async update(id, data) {
        return Place.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return Place.findByIdAndDelete(id);
    }
}

module.exports = new PlaceRepository();