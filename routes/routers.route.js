const express = require('express');
const router = express.Router();
const RoutersControllers = require('../controllers/router.controllers.js');


router.get('/router/all', RoutersControllers.getAllRouters);
router.post('/add/router', RoutersControllers.addRouter);
router.put('/router/update/:id', RoutersControllers.updateRouters);
router.delete('/router/delete/:id', RoutersControllers.deleteRouter);


module.exports = router;
