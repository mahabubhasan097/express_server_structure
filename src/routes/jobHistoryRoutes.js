const express = require('express');
const router = express.Router();
const jobHistoryController = require('../controllers/jobHistoryController');

router.get('/getJobHistories', jobHistoryController.getJobHistories);
router.get('/getJobHistories/:id', jobHistoryController.getJobHistoryById);
router.post('/addJobHistory', jobHistoryController.addJobHistory);
router.put('/updateJobHistory/:id', jobHistoryController.updateJobHistory);
router.delete('/deleteJobHistory/:id', jobHistoryController.deleteJobHistory);

module.exports = router;