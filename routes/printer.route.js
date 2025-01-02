const express = require('express');
const router = express.Router();
const printerController = require('../controllers/printer.controllers.js');


router.post('/printer/add', printerController.createPrinter);
router.get('/printer/all', printerController.getPrinters);
router.put('/printer/update/:id', printerController.updatePrinter);
router.delete('/printer/delete/:id', printerController.deletePrinter);

module.exports = router;
