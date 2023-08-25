const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/getEmployees', employeeController.getEmployees);
router.get('/getEmployee/:id', employeeController.getEmployeeById);
router.post('/addEmployee', employeeController.addEmployee);
router.put('/updateEmployee/:id', employeeController.updateEmployee);
router.delete('/deleteEmployee/:id', employeeController.deleteEmployee);

module.exports = router;