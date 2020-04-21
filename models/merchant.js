const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const merchantSchema = new Schema({
    merchantName: String
});

module.exports = mongoose.model('merchants', merchantSchema)