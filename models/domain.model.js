const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domainSchema = new Schema({
    provider: {
        type: String,
        enum:[
            'Go-daddy',
            'ernet',
             "Aws"
        ],
        required: true,
    },
    serverName: {
        type: String,
        required: true,
    },
    serverType: {
        type: String,
        required: true,
        enum: ['Shared Hosting', 'VPS', 'Cloud Hosting', 'Dedicated Server'], 
    },
    serverIp: {
        type: String,
        required: true, 
        validate: {
            validator: function (v) {
                return /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/.test(v);
            },
            message: 'Invalid IP address format',
        },
    },
    serverUrl: {
        type: String,
    },
    tld: {
        type: String,
    },
    ownerName: {
        type: String,
        required: true,
    },
    registeredOrganization:{
        type: String,
        required: true,
    },
    cloudFlare:{
     type:String,
     enum:["yes","no"],
    },
    googleAuthentication:{
        type:String,
        enum:["yes","no"],
    },
    registerEmail:{
        type:String,
        required:true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Credit Card', 'Bank Transfer', 'PayPal', 'Other'], 
    },
    oneTimeCost: {
        type: Number, 
        required: false,
    },
    lastBackupDate: {
        type: Date,
        required: false,
    },
    nextMaintenanceDate: {
        type: Date,
        required: false,
    },
    description: {
        type: String,
        required: false,
        maxlength: 500, 
    },
});

module.exports = mongoose.model('Domain', domainSchema);
