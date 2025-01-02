const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phone.controllers.js');

router.post('/phone/add', phoneController.createPhone);
router.get('/phone/all', phoneController.getPhones);
router.get('/phone/:id', phoneController.getPhoneById);
router.put('/phone/:id', phoneController.updatePhone);
router.delete('/phone/:id', phoneController.deletePhone);

module.exports = router;
