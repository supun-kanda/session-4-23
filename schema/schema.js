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
        GraphQLNonNull
    } = graphql;

// models
const Device = require('../models/device'),
    Merchant = require('../models/merchant');

// schemas
const
    DeviceType = new GraphQLObjectType({
        name: 'Device',
        fields: () => ({
            id: { type: GraphQLID },
            osVersion: { type: GraphQLString },
            mac: { type: GraphQLString },
            registerNo: { type: GraphQLInt },
            merchant: {
                type: MerchantType,
                resolve(parent, args) {
                    return Merchant.findById(parent.merchantId);
                }
            }
        })
    }),
    MerchantType = new GraphQLObjectType({
        name: 'Merchant',
        fields: () => ({
            id: { type: GraphQLID },
            merchantName: { type: GraphQLString },
            devices: {
                type: new GraphQLList(DeviceType),
                args: { id: { type: GraphQLID } },
                resolve(parent, args) {
                    return Device.find({ merchantId: parent.id })
                }
            }
        })
    });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        device: {
            type: DeviceType,
            args: { deviceId: { type: GraphQLID } },
            resolve(parent, args) {
                return Device.findById(args.deviceId)
            }
        },
        merchant: {
            type: MerchantType,
            args: { merchantId: { type: GraphQLID } },
            resolve(parent, args) {
                return Merchant.findById(args.merchantId)
            }
        },
        devices: {
            type: new GraphQLList(DeviceType),
            resolve(parent) {
                return Device.find()
            }
        },
        merchants: {
            type: new GraphQLList(MerchantType),
            resolve(parent) {
                return Merchant.find()
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMerchant: {
            type: MerchantType,
            args: {
                merchantName: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const merchant = new Merchant({
                    merchantName: args.merchantName
                });
                return merchant.save()
            }
        },
        addDevice: {
            type: DeviceType,
            args: {
                deviceId: { type: new GraphQLNonNull(GraphQLID) },
                osVersion: { type: new GraphQLNonNull(GraphQLString) },
                registerNo: { type: new GraphQLNonNull(GraphQLInt) },
                merchantId: { type: new GraphQLNonNull(GraphQLString) },
                mac: { type: new GraphQLNonNull(GraphQLString) }
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