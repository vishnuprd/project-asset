const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const printerSchema = new Schema({
    printerId: {
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
  handledBy: {
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
        required: true,
    },
    description: {
        type: String,
    },

}, { timestamps: true });

module.exports = mongoose.model('Printer', printerSchema);
   