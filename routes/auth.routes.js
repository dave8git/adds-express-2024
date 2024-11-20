const express = require('express');
const router = express.Router(); 

const auth = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
//router.get('/user', auth.getUser);
router.get('/user', authMiddleware, auth.getUser);

module.exports = router;