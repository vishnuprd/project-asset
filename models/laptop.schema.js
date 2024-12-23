const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const laptopSchema = new Schema({
  laptopId: {
    type: String,
    unique: true,
    required: true,
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
  status: {
    type: String,
    enum: ["Assigned", "Returned", "Lost", "Scrap", "Repaired", "Available"],
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  adminAccount: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  version: {
    type: String,
    enum: ["Windows-XP", "Vista", "7-32 bit", "7-64 bit", "8", "8.1", "10", "10 pro", "10 edu", "11", "12", "13"],
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  processor: {
    type: String,
    required: true,
  },
  division:{
    type: String,
  },
  storage: {
    type: String,
    required: true,
  },
  ssdStorage: {
    type: String,
    required: true,
  },
  windowSoftware: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  antivirus: {
    type: String,
    enum: ["Installed", "Not Installed"],
    required: true,
  },
  msOffice: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
}, { timestamps: true });

const Laptop = mongoose.model('Laptop', laptopSchema);
module.exports = Laptop;