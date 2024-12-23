const Laptop = require('../models/laptop.schema.js');
const Employee = require('../models/employee.model.js'); 

exports.createLaptop = async (req, res) => {
    try {
    
      const employee = await Employee.findOne({ employeeId: req.body.assignedTo });
      
      if (!employee) {
        console.error('Employee not found');
        return res.status(404).send({ message: 'Employee not found' });
      }
  
      const newLaptop = new Laptop({
        ...req.body,
        assignedTo: employee._id 
      });
  
     
      await newLaptop.save();
      res.status(201).send(newLaptop);
    } catch (error) {
      console.error('Error creating laptop:', error.message);
      res.status(500).send({ error: error.message });
    }
  };


exports.getLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find().populate('assignedTo');
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getLaptopById = async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        if (!laptop) return res.status(404).json({ error: 'Laptop not found' });
        res.json(laptop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLaptop = async (req, res) => {
    try {
        const laptop = await Laptop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!laptop) return res.status(404).json({ error: 'Laptop not found' });
        res.json(laptop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteLaptop = async (req, res) => {
    try {
        const laptop = await Laptop.findByIdAndDelete(req.params.id);
        if (!laptop) return res.status(404).json({ error: 'Laptop not found' });
        res.json({ message: 'Laptop deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAvailableLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find({ status: 'Available' });
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAssignedLaptops = async (req, res) => {
    try {
        const laptops = await Laptop.find({ assignedTo: { $ne: null } });
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLaptopsByAssignedTo = async (req, res) => {
    try {
        const laptops = await Laptop.find({ assignedTo: req.params.assignedTo });
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};