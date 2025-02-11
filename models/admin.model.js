const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'hr', 'other'], 
    },
  
    },
     { timestamps: true });




module.exports = mongoose.model('Admin', AdminSchema);
