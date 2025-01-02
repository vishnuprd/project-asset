const Dongle = require('../models/dongle.model.js');

// Create a new Dongle
exports.createDongle = async (req, res) => {
    try {
        const newDongle = new Dongle(req.body);
        console.log(newDongle);
        await newDongle.save();
        res.status(201).json(newDongle);
    } catch (error) {
        console.error('Error creating dongle:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get all Dongles
exports.getDongles = async (req, res) => {
    try {
        const dongles = await Dongle.find();
        res.status(200).json(dongles);
    } catch (error) {
        console.error('Error fetching dongles:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get a Dongle by its ID
exports.getDongleById = async (req, res) => {
    try {
        const dongle = await Dongle.findById(req.params.id);
        if (!dongle) return res.status(404).json({ error: 'Dongle not found' });
        res.status(200).json(dongle);
    } catch (error) {
        console.error('Error fetching dongle:', error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.updateDongle = async (req, res) => {
    try {
     
      const updatedDongle = await Dongle.findOneAndUpdate(
        { dongleId: req.params.id }, 
        req.body, 
        { new: true } 
      );
  
      if (!updatedDongle) {
        return res.status(404).json({ error: 'Dongle not found' });
      }
  
      res.status(200).json(updatedDongle); 
    } catch (error) {
      console.error('Error updating dongle:', error.message);
      res.status(400).json({ error: error.message });
    }
  };
  

// Delete a Dongle
exports.deleteDongle = async (req, res) => {
    try {
        const deletedDongle = await Dongle.findByIdAndDelete(req.params.id);
        if (!deletedDongle) return res.status(404).json({ error: 'Dongle not found' });
        res.status(200).json({ message: 'Dongle deleted successfully' });
    } catch (error) {
        console.error('Error deleting dongle:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get all available Dongles
exports.getAvailableDongles = async (req, res) => {
    try {
        const availableDongles = await Dongle.find({ status: 'Available' });
        res.status(200).json(availableDongles);
    } catch (error) {
        console.error('Error fetching available dongles:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get all assigned Dongles
exports.getAssignedDongles = async (req, res) => {
    try {
        const assignedDongles = await Dongle.find({ handledBy: { $exists: true, $ne: null } });
        res.status(200).json(assignedDongles);
    } catch (error) {
        console.error('Error fetching assigned dongles:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get Dongles by handled employee
exports.getDonglesByHandledBy = async (req, res) => {
    try {
        const handledDongles = await Dongle.find({ handledBy: req.params.handledBy });
        res.status(200).json(handledDongles);
    } catch (error) {
        console.error('Error fetching dongles by handledBy:', error.message);
        res.status(500).json({ error: error.message });
    }
};
