const express = require('express');
const payment_controller = require('../controller/PaymentController');
const verifyToken = require('../route/authorize');
const Role = require('../_helpers/role');
const route = express.Router();

// route.post('/payments/add',payment_controller.payment_add); 


module.exports = route