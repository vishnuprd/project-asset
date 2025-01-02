const express = require('express');
const router = express.Router();
const desktopController = require('../controllers/desktop.controllers.js');


router.post('/desktop', desktopController.createDesktop);
router.get('/desktop/all', desktopController.getDesktops);
router.get('/desktop/:id', desktopController.getDesktopById);
router.put('/desktop/:id', desktopController.updateDesktop);
router.delete('/desktop/:id', desktopController.deleteDesktop);
router.get('/desktop/available', desktopController.getAvailableDesktops);
router.get('/desktop/assigned', desktopController.getAssignedDesktops);
router.get('/desktop/assigned/:assignedTo', desktopController.getDesktopsByAssignedTo);

module.exports = router;