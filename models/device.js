const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const devicesSchema = new Schema({
    _id: Number,
    osVersion: String,
    mac: String,
    registerNo: Number,
    merchantId: String
})

module.exports = mongoose.model('devices', devicesSchema)