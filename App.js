const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

//route paths
const user_route = require('./route/UserRoute');
const category_route = require('./route/CategoryRoute');
const table_route = require('./route/TableSeatRoute');
const discount_route = require('./route/DiscountRoute');
const product_route = require('./route/ProductRoute');
const price_route = require('./route/PriceRoute');
const role_route = require('./route/RoleRoute');
const payment_route = require('./route/PaymentRoute');
const errorHandler = require('./_helpers/error_handler');
//port number
const PORT = process.env.PORT || 5005;
//utilies
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(errorHandler);

//route lists
//even though it has route path,if it has no requeted data,it won't be work
//store all user
app.use('/',user_route);
app.use('/',category_route);
app.use('/',table_route);
app.use('/',discount_route);
app.use('/',product_route);
app.use('/',price_route);
app.use('/',role_route);
app.use('/',payment_route);
//
//authication error handler

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
