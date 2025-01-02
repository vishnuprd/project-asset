const express = require('express');
const router = express.Router();
const projectorController = require('../controllers/projector.controllers.js');


router.get('/projector/all', projectorController.getAllProjectors);
router.post('/projector/add', projectorController.addProjector);
router.put('/projector/update/:id', projectorController.updateProjector);
router.delete('/projector/delete/:id', projectorController.deleteProjector);

module.exports = router;
