const util = require('util');
const mysql = require('mysql');
const pool = mysql.createPool({
    //should go notice here .there might be typing error for properties
    connectionLimit:10,
    host:'restaurant.com',
    user:'user125',
    password:'root',
    database:'restaurantdb'

});
pool.getConnection((err,connection)=>{
    if(err)
    console.error("Sth went wrong in connection to database");
    if(connection)
    //console.log("yep");
    connection.release();
    return;
});
pool.query = util.promisify(pool.query);
module.exports = pool;