const mongoose = require('mongoose');

const simSchema = new mongoose.Schema(
  {
    simCardId: {
      type: String,
      required: true,
    },
    networkName: {
      type: String,
      required: true,
    },
    handledBy: {
      type: String,
    },
    location: {
      type: String,
    },
    division: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "non-assigned", "inactive", "lost", "damaged", "others"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true } 
);

const Sim = mongoose.model('Sim', simSchema);

module.exports = Sim; 
