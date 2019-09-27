const express = require('express');
const price_controller = require('../controller/PriceController');
const route = express.Router();

route.get('/prices',price_controller.price_get);
route.get('/prices/new',price_controller.price_new);
route.get('/prices/old',price_controller.price_old);
route.post('/prices/add',price_controller.price_add); 
route.put('/prices/edit/:id',price_controller.price_edit);
route.put('/prices/remove/:id',price_controller.price_remove);


module.exports = route