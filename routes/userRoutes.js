const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware');
const {getDocotor,updateUserData} = require('../controllers/userController');

router.post('/doctor', getDocotor);
router.post('/update', updateUserData);

module.exports = router;
