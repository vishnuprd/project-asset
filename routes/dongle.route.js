const express = require('express');
const router = express.Router();
const dongleController = require('../controllers/dongle.controllers.js');


router.post('/dongle/add', dongleController.createDongle);
router.get('/dongle/all', dongleController.getDongles);
router.put('/update/:id', dongleController.updateDongle);
router.delete('/delete/:id', dongleController.deleteDongle);


module.exports = router;
