const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    coords: {
        timestamp: Number,
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    },
    name: {
        type: String
    }
});

const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointSchema]
});

mongoose.model("Track", trackSchema);