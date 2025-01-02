const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    phoneId: {
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
}, { timestamps: true });

const Phone = mongoose.model('Phone', phoneSchema);
module.exports = Phone;