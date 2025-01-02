const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/laptop.controllers.js');


router.post('/laptop', laptopController.createLaptop);
router.get('/laptop/all', laptopController.getLaptops);
router.get('/laptop/:id', laptopController.getLaptopById);
router.put('/laptop/:id', laptopController.updateLaptop);
router.delete('/laptop/:id', laptopController.deleteLaptop);
router.get('/laptop/available', laptopController.getAvailableLaptops);
router.get('/laptop/assigned', laptopController.getAssignedLaptops);
router.get('/laptop/assigned/:assignedTo', laptopController.getLaptopsByAssignedTo);

module.exports = router;