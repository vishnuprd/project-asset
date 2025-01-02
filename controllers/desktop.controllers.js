const Desktop = require('../models/desktop.schema.js');
const Employee = require('../models/employee.model.js'); 

// Create a new desktop
exports.createDesktop = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.body.assignedTo });
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    const newDesktop = new Desktop({
      ...req.body,
      assignedTo: employee._id // Use ObjectId
    });

    await newDesktop.save();
    res.status(201).send(newDesktop);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get all desktops
exports.getDesktops = async (req, res) => {
  try {
    const desktops = await Desktop.find().populate('assignedTo');
    res.json(desktops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get desktop by ID
exports.getDesktopById = async (req, res) => {
  try {
    const desktop = await Desktop.findById(req.params.id).populate('assignedTo');
    if (!desktop) return res.status(404).json({ error: 'Desktop not found' });
    res.json(desktop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.updateDesktop = async (req, res) => {
  try {
    const desktop = await Desktop.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('assignedTo');
    if (!desktop) return res.status(404).json({ error: 'Desktop not found' });
    res.json(desktop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteDesktop = async (req, res) => {
  try {
    const desktop = await Desktop.findByIdAndDelete(req.params.id);
    if (!desktop) return res.status(404).json({ error: 'Desktop not found' });
    res.json({ message: 'Desktop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get available desktops
exports.getAvailableDesktops = async (req, res) => {
  try {
    const desktops = await Desktop.find({ status: 'Available' }).populate('assignedTo');
    res.json(desktops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get assigned desktops
exports.getAssignedDesktops = async (req, res) => {
  try {
    const desktops = await Desktop.find({ assignedTo: { $ne: null } }).populate('assignedTo');
    res.json(desktops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get desktops assigned to a specific employee
exports.getDesktopsByAssignedTo = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.assignedTo });
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    const desktops = await Desktop.find({ assignedTo: employee._id }).populate('assignedTo');
    res.json(desktops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};