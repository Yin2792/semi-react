const express = require('express');
const category_controller = require('../controller/CategoryController');
const verifyToken = require('../route/authorize');
const Role = require('../_helpers/role');
const route = express.Router();

route.get('/category',verifyToken(Role.Admin),category_controller.category_get);
route.get('/category/name',category_controller.category_name);
route.get('/category/lists',category_controller.category_by_id);
route.post('/add/category',category_controller.category_add);
route.put('/edit/category/:id',verifyToken(),category_controller.category_edit);
route.put('/category/remove/:id',category_controller.category_remove);


module.exports = route