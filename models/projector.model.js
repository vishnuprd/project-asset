const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectorSchema = new Schema({
    projectorId: {
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
    handledBy:{
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
    status: {
        type: String,
        enum: ["Active", "Inactive", "Under Maintenance"],  
        default: "Active",  
    },
    description: {
        type: String,  
    }
}, { timestamps: true });  

module.exports = mongoose.model('Projector', projectorSchema);
