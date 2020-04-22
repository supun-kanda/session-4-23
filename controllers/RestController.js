const Device = require('../models/device'),
    Merchant = require('../models/merchant')

function getAllMerchants(req, res) {
    Merchant.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
}

function getAllDevices(req, res) {
    Device.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
}
module.exports = {
    getAllMerchants,
    getAllDevices
}