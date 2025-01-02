const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tabletSchema = new Schema({
    tabletId: {
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
        
    },
    division: {
        type: String,
        
    },
}, { timestamps: true }); 

module.exports = mongoose.model('Tablet', tabletSchema);
