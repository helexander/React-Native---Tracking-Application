const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longtitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
});

const trackSchema = new mongoose.Schema({
    userId: {
        // This is to indicate that user id is a reference to some other object stored inside of MongoDB
        type: mongoose.Schema.Types.ObjectId,
        // ref points to an instance of a User
        ref: 'User'
    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointSchema]
});

mongoose.model('Track', trackSchema);