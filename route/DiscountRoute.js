const express = require('express');
const discount_controller = require('../controller/DiscountController');
const route = express.Router();

route.get('/discounts',discount_controller.discount_get);
route.post('/discounts/add',discount_controller.discount_add); 
route.put('/discounts/edit/:id',discount_controller.discount_edit);



module.exports = route