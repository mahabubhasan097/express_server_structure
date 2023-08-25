const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');

router.get('/getDepartmentsAndDesignations', generalController.getDepartmentsAndDesignations);

module.exports = router;