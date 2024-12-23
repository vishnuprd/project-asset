const express = require('express');
const router = express.Router();
const desktopController = require('../controllers/desktop.controllers.js');

// POST request to create a new desktop
router.post('/desktop', desktopController.createDesktop);

// GET all desktops
router.get('/desktop/all', desktopController.getDesktops);

// GET a desktop by ID
router.get('/desktop/:id', desktopController.getDesktopById);

// PUT request to update a desktop by ID
router.put('/desktop/:id', desktopController.updateDesktop);

// DELETE request to delete a desktop by ID
router.delete('/desktop/:id', desktopController.deleteDesktop);

// GET available desktops
router.get('/desktop/available', desktopController.getAvailableDesktops);

// GET assigned desktops
router.get('/desktop/assigned', desktopController.getAssignedDesktops);

// GET desktops assigned to a specific employee
router.get('/desktop/assigned/:assignedTo', desktopController.getDesktopsByAssignedTo);

module.exports = router;