const express = require('express');
const loginController = require('../controllers/login');
const router = express.Router();

router.post('/login', loginController.login);

router.get('/login', loginController.logout);

router.get('/logout', loginController.logout);
module.exports = router;
