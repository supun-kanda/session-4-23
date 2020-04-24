// core modules
const graphql = require('graphql'),
    _ = require('lodash'),
    {
        GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull,
        GraphQLFloat
    } = graphql;

// models
const Device = require('../models/device'),
    Merchant = require('../models/merchant');

// schemas
const
    DeviceType = new GraphQLObjectType({
        name: 'Device',
        description: "Point of sales device entity which holds its core values",
        fields: () => ({
            id: {
                type: GraphQLID,
                description: "device id"
            },
            osVersion: {
                type: GraphQLString,
                description: "Operating system version of the device"
            },
            mac: {
                type: GraphQLString,
                description: "MAC address of the device"
            },
            registerNo: {
                type: GraphQLInt,
                description: "Register number given by the merchant"
            },
            merchant: {
                type: MerchantType,
                description: "Merchant which owns the device",
                resolve(parent, args) {
                    return Merchant.findById(parent.merchantId);
                }
            }
        })
    }),
    MerchantType = new GraphQLObjectType({
        name: 'Merchant',
        description: "Restaurant (Merchant) entity which holds restaurant properties",
        fields: () => ({
            id: {
                type: GraphQLID,
                description: "Merchant Identification key"
            },
            merchantName: {
                type: GraphQLString,
                description: "Restaurant name"
            },
            location: {
                type: GraphQLString,
                description: "Restaurant location"
            },
            timeZone: {
                type: GraphQLString,
                description: "Timezone of the merchant"
            },
            owner: {
                type: GraphQLString,
                description: "The name of the owner"
            },
            rating: {
                type: GraphQLFloat,
                description: "Customer rating for the restauant"
            },
            devices: {
                type: new GraphQLList(DeviceType),
                description: "Point of sales devices that merchant owns",
                resolve(parent, args) {
                    return Device.find({ merchantId: parent.id })
                }
            }
        })
    });

// queries
const RootQuery = new GraphQLObjectType({
    name: 'Queries',
    description: 'Queries to fetch information from the restaurants database',
    fields: {
        device: {
            type: DeviceType,
            description: "Fetch single device information based on it's keys",
            args: {
                deviceId: {
                    type: GraphQLID,
                    description: "device id"
                },
                merchantId: {
                    type: GraphQLString,
                    description: "id of the merchant who owns the POS"
                },
                registerNo: {
                    type: GraphQLInt,
                    description: "Register number given by the merchant"
                }
            },
            resolve(parent, args) {
                const queryFeilds = ['deviceId', 'merchantId', 'registerNo'],
                    query = {};
                queryFeilds.forEach(field => {
                    if (args[field]) {
                        query[field] = args[field];
                    }
                });
                return Device.findOne(query);
            }
        },
        merchant: {
            type: MerchantType,
            description: "Fetch single restaurant document based on its keys",
            args: {
                merchantId: {
                    type: GraphQLID,
                    description: "id of the merchant"
                }
            },
            resolve(parent, args) {
                return Merchant.findById(args.merchantId)
            }
        },
        devices: {
            type: new GraphQLList(DeviceType),
            description: "Fetch all devices from devices collection",
            args: {
                limit: {
                    type: GraphQLInt,
                    description: "limit the responses"
                }
            },
            resolve(parent, args) {
                return Device.find().limit(args.limit)
            }
        },
        merchants: {
            type: new GraphQLList(MerchantType),
            description: "Fetch all merchant documents from merchants collection",
            args: {
                limit: {
                    type: GraphQLInt,
                    description: "limit the responses"
                }
            },
            resolve(parent, args) {
                return Merchant.find().limit(args.limit)
            }
        }
    }
});

// mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'CRUD operations which can be provoked on restaurant db',
    fields: {
        addMerchant: {
            type: MerchantType,
            description: "add merchant into merchants collection restaurants db",
            args: {
                merchantName: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Restaurant name"
                },
                location: {
                    type: GraphQLString,
                    description: "Restaurant location"
                },
                timeZone: {
                    type: GraphQLString,
                    description: "Timezone of the merchant"
                },
                owner: {
                    type: GraphQLString,
                    description: "The name of the owner"
                },
                rating: {
                    type: GraphQLFloat,
                    description: "Customer rating for the restauant"
                },
            },
            resolve(parent, args) {
                const merchant = new Merchant({
                    merchantName: args.merchantName,
                    location: args.location,
                    timeZone: args.timeZone,
                    owner: args.owner,
                    rating: args.rating
                });
                return merchant.save()
            }
        },
        addDevice: {
            type: DeviceType,
            args: {
                deviceId: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: "device id"
                },
                osVersion: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Operating system version of the device"

                },
                registerNo: {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: "Register number given by the merchant"

                },
                merchantId: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "id of the merchant who owns the POS"

                },
                mac: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "MAC address of the device"

                }
            },
            resolve(parent, args) {
                const device = new Device({
                    _id: args.deviceId,
                    osVersion: args.osVersion,
                    registerNo: args.registerNo,
                    merchantId: args.merchantId,
                    mac: args.mac
                });
                return device.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})