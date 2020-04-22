// core modules
const { readFileSync } = require('fs');

// constants
const
    dummyDevice = [
        { name: 'device1', registerId: 'registerId1', deviceId: "1" },
        { name: 'device2', registerId: 'registerId2', deviceId: "2" },
        { name: 'device3', registerId: 'registerId3', deviceId: "3" },
        { name: 'device4', registerId: 'registerId3', deviceId: "4" },
        { name: 'device5', registerId: 'registerId2', deviceId: "5" },
        { name: 'device6', registerId: 'registerId3', deviceId: "6" }
    ],
    dummyMerchant = [
        { name: 'restaurant1', seats: 20, id: "1" },
        { name: 'restaurant2', seats: 30, id: "2" },
        { name: 'restaurant3', seats: 40, id: "3" }
    ],
    externalSourceFile = 'constants.json',
    rawConstants = readFileSync(externalSourceFile),
    { mongoUrl } = JSON.parse(rawConstants);

module.exports = {
    dummyDevice,
    dummyMerchant,
    mongoUrl
}