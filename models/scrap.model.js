const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scrapLaptopSchema = new mongoose.Schema({
  scrapID: {
    type: String,
    default: 'SCRAP-ID-9999',
  },
  type:{
    type: String,
    enum:["Laptop", "Desktop", ]
  },
  assetID:{
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  location:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateScrapped: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Scrapped", "Not scrapped"],
    default: "Scrapped",
  },
  adminAccount: {
    type: String,
    enum: ["Yes", "No"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const ScrapLaptop = mongoose.model('ScrapLaptop', scrapLaptopSchema);

module.exports = ScrapLaptop;