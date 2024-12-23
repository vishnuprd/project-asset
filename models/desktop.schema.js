const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DesktopSchema = new mongoose.Schema(
  {
    desktopId: {
      type: String,
      unique: true,
      required: true,
    },
    monitor: {
      type: String,
      required: true,
    },
    cpu: {
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
    division: {
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
    changeHistory: [
      {
        field: { type: String, required: true }, 
        oldValue: { type: String },            
        newValue: { type: String },            
        changedBy: { type: String },           
        changedAt: { type: Date, default: Date.now }, 
      },
    ],
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Desktop', DesktopSchema);
