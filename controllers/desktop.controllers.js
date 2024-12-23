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

// Update a desktop


exports.updateDesktop = async (req, res) => {
  try {
    const desktopId = req.params.id;
    const updates = req.body;
    const user = req.user.name || "Admin"; 

  
    const desktop = await Desktop.findById(desktopId);
    if (!desktop) {
      return res.status(404).json({ error: 'Desktop not found' });
    }

   
    const changeHistory = [];
    for (const key in updates) {
      if (desktop[key] && desktop[key] !== updates[key]) {
        changeHistory.push({
          field: key,
          oldValue: desktop[key],
          newValue: updates[key],
          changedBy: req.user?.username || 'Unknown User', 
        });
      }
    }

    Object.assign(desktop, updates);
    if (changeHistory.length > 0) {
      desktop.changeHistory = [...desktop.changeHistory, ...changeHistory];
    }

   
    await desktop.save();

    res.status(200).json({ message: 'Desktop updated successfully', desktop });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete a desktop
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