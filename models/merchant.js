const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const merchantSchema = new Schema({
    merchantName: String,
    location: String,
    timeZone: String,
    owner: String,
    rating: Number
});

module.exports = mongoose.model('merchants', merchantSchema)