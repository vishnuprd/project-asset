const express = require('express');
const router = express.Router();
const cctvController = require('../controllers/cctv.controllers.js');

router.get('/cctv/all', cctvController.getAllCCTVs);
router.post('/add', cctvController.addCCTV);
router.put('/update/:id', cctvController.updateCCTV);
router.delete('/delete/:id', cctvController.deleteCCTV);

module.exports = router;