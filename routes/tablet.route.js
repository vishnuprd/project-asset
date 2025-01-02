const express = require('express');
const router = express.Router();
const tabletController = require('../controllers/tablet.controllers.js');


router.post('/tablet/add', tabletController.createTablet);
router.get('/tablet/all', tabletController.getTablets);
router.put('/tablet/update/:id', tabletController.updateTablet);
router.delete('/tablet/delete/:id', tabletController.deleteTablet);



module.exports = router;
