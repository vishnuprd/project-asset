const mongoose = require('mongoose');

const routerSchema = new mongoose.Schema({
    routerId: {
        type: String,   
    },
    brand:{
        type: String,
    },
    serialNumber: {
        type: String,
    },
    coverage:{
        type: String,
    },
    speed:{
        type: String,
    },
    storage:{
        type: String,
    },
    location:{
        type: String,
    },
    division:{
        type: String,
    },
    status: {
        type: String,
        
    },
    description: {
        type: String,
    },
   
}, {timestamps: true});

module.exports = mongoose.model('Router', routerSchema);
   