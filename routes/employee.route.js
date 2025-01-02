const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controllers.js');


router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);




module.exports = router;