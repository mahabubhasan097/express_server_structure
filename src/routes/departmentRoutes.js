const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/getDept', departmentController.getDepartments);
router.get('/getDeptById/:id', departmentController.getDepartmentById);
router.post('/addDept', departmentController.addDepartment);
router.put('/updateDept/:id', departmentController.updateDepartment);
router.delete('/deleteDept/:id', departmentController.deleteDepartment);

module.exports = router;
