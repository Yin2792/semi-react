const express = require('express');
const table_controller = require('../controller/TableSeatController');
const route = express.Router();

route.get('/tablelists',table_controller.table_get);
route.post('/add/table',table_controller.table_add); 
route.put('/edit/table/:id',table_controller.table_edit);
route.put('/check/table/:id',table_controller.table_check);


module.exports = route
