const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: { type: String, required: true, unique: true },
  employeeName: { type: String, required: true },
  employeeEmail: { type: String, },
  position: { type: String,},
  location: { type: String, required: true },
  gender: { type: String, },
  division: { type: String,  },
  status: { type: String, },
  dateOfJoining: { type: Date,  },
  adminAccount: { type: String, },
  description: { type: String, },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  assets: [{
    type: Schema.Types.ObjectId,
    ref: 'Laptop',
    ref: 'Desktop',
  }] 
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;