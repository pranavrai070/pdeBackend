const express = require('express');
const router = express.Router();
const {authMiddleware }= require('../middleware/authMiddleware');
const alertController = require('../controllers/alertController');

router.post('/', alertController.sendAlert);
router.post('/accept', alertController.acceptAlert);
router.post('/close', alertController.closeAlert);
router.post('/get', alertController.getAlerts);
router.get('/get/:alertId', alertController.getAlert);
router.post('/getPatientPendingAlert', alertController.getPatientPendingAlert);

module.exports = router;
