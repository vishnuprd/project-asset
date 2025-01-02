const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dongleSchema = new Schema({
    dongleId: {
        type: String,      
    },
    brand: {
        type: String,
        required: true,  
    },
    model: {
        type: String,
        required: true,  
    },
    serialNumber: {
        type: String,
        required: true,  
    },
    handledBy: {
        type: String,
        required:true,
    },
    status: {
        type: String,
        enum: ["Assigned", "Lost", "Scrap", "Available"],
         
    },
    description: {
        type: String,
    },
    location: {
        type: String,
        required: true,  
    },
    division: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Dongle = mongoose.model('Dongle', dongleSchema);
module.exports = Dongle;
