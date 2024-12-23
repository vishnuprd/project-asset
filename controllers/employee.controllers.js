const Employee = require('../models/employee.model.js');

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        console.log(employee);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('assets');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('assets');
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    console.log('ID:', req.params.id);
    console.log('Request Body:', req.body);

    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add asset to employee
exports.addAssetToEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        employee.assets.push(req.body.assetId);
        await employee.save();
        res.json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};