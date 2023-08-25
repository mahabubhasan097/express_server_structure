const express = require('express');
const router = express.Router();
const educationHistoryController = require('../controllers/educationHistoryController');

router.get('/getEduHistories', educationHistoryController.getEducationHistories);
router.get('/getEduHistories/:id', educationHistoryController.getEducationHistoryById);
router.post('/addEduHistory', educationHistoryController.addEducationHistory);
router.put('/updateEduHistory/:id', educationHistoryController.updateEducationHistory);
router.delete('/deleteEduHistory/:id', educationHistoryController.deleteEducationHistory);

module.exports = router;