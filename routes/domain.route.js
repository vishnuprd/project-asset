const router = require('express').Router();
const domainControllers = require('../controllers/domain.controllers.js');


router.get('/all', domainControllers.getAllDomains);
router.post('/add', domainControllers.AddDomain);
router.put('/update/:id', domainControllers.updateDomain);
router.delete('/delete/:id', domainControllers.deleteDomain);

module.exports = router;
