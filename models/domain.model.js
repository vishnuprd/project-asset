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
        enum: ['Shared Hosting', 'VPS', 'Cloud Hosting', 'Dedicated Server','Others'], 
    },
    serverIp: {
        type: String,
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
        type: String, 
    },
    description: {
        type: String,
        maxlength: 500, 
    },
});

module.exports = mongoose.model('Domain', domainSchema);
