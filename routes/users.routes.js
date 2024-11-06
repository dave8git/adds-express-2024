const express = require('express');
const router = express.Router();
// //const db = require('./../db');
// //const ObjectId = require('mongodb').ObjectId;
const UsersControllers = require('../controllers/users.controller');

router.get('/users', UsersControllers.getAll);

// router.get('/employees/random', EmployeesControllers.getRandom);

// router.get('/employees/:id', EmployeesControllers.getById);

// router.post('/employees', EmployeesControllers.post);

// router.put('/employees/:id', EmployeesControllers.put);

// router.delete('/employees/:id', EmployeesControllers.delete);

module.exports = router;