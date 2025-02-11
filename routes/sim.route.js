const express = require('express');
const router = express.Router();
const simCardControllers = require('../controllers/sim.controllers.js');


router.get('/sim-card/all', simCardControllers.getAllSimCard);
router.post('/add/sim-card', simCardControllers.addSimCard);   
router.put('/sim-card/update/:id', simCardControllers.updateSimCard);
router.delete('/sim-card/delete/:id', simCardControllers.deleteSimCard);


module.exports = router;
