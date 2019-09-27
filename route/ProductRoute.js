const express = require('express');

const product_controller = require('../controller/ProductController');
const route = express.Router();

route.get('/products',product_controller.product_get);
route.get('/products/nodiscount',product_controller.product_no_discount);
route.post('/add/product',product_controller.product_add); 
route.put('/edit/product/:id',product_controller.product_edit);
//route.put('/product/remove/:id',product_controller.product_remove);


module.exports = route