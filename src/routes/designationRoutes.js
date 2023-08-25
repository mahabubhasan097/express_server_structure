const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationController');

router.get('/getDesg', designationController.getDesignations);
router.get('/getDesgById/:id', designationController.getDesignationById);
router.post('/addDesg', designationController.addDesignation);
router.put('/updateDesg/:id', designationController.updateDesignation);
router.delete('/deleteDesg/:id', designationController.deleteDesignation);

module.exports = router;