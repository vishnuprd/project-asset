const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/laptop.controllers.js');

// POST request to create a new laptop
router.post('/laptop', laptopController.createLaptop);

// GET all laptops
router.get('/laptop/all', laptopController.getLaptops);

// GET a laptop by ID
router.get('/laptop/:id', laptopController.getLaptopById);

// PUT request to update a laptop by ID
router.put('/laptop/:id', laptopController.updateLaptop);

// DELETE request to delete a laptop by ID
router.delete('/laptop/:id', laptopController.deleteLaptop);

// GET available laptops
router.get('/laptop/available', laptopController.getAvailableLaptops);

// GET assigned laptops
router.get('/laptop/assigned', laptopController.getAssignedLaptops);

// GET laptops assigned to a specific employee
router.get('/laptop/assigned/:assignedTo', laptopController.getLaptopsByAssignedTo);

module.exports = router;