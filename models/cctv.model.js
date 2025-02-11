const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cctvSchema = new Schema({
    cctvId: {
        type: String,   
    },
    model: {
        type: String,
        required: true,  
    },
    serialNumber: {
        type: String,
        required: true, 
    },
    location: {
        type: String,
        required: true,  
    },
    division: {
        type: String,
        required: true,  
    },
    status: {
        type: String,  
        default: 'Active'
    },
    description: {
        type: String,  
    },
    storageType:{
        type: String,
    },
    storageSize: {
        type: String,
    },
    storageDate: {
        type:String,
    },
    ipAddress: {
        type: String,
        required: true,  
        match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,  // Validates the IP address format
    },
}, { timestamps: true });  

module.exports = mongoose.model('CCTV', cctvSchema);
