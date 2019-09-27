const pool = require('../DbConnection/db');
const SELECT_ALL_PRODUCT_PRICE ='SELECT * FROM product_price';
const moment = require('moment');
const localTime = moment().format('YYYY-MM-DD HH:mm:ss');
let  PRODUCT_PRICE_MODEL = () => {};
PRODUCT_PRICE_MODEL.prototype = {

    add_price:body=>{
        let price_data = body;
        const INSERT_PRODUCT_PRICE_QUERY = `INSERT INTO product_price (price,product_id,status,date) VALUES('${price_data.price}','${price_data.product_id}','${price_data.status}','${localTime}')`;
      
           return new Promise((resolve,reject)=>{
               pool.query(INSERT_PRODUCT_PRICE_QUERY,(err,result)=>{
                   //console.log(result);
                   if(err) reject(err);
                    resolve(result);
               })
           })
        },
        edit_price :(id,body)=>{
            const PRODUCT_PRICE_EDIT_QUERY = "UPDATE product_price SET price = ?,product_id = ?,date = ? WHERE price_id = ? ";
            return new Promise((resolve,reject)=>{
             pool.query(PRODUCT_PRICE_EDIT_QUERY,[body.new_price,body.new_product_id,localTime,id],(err,results)=>{
                 if(err) reject(err);
                 resolve(results);
                 
             })
            })
        },
        remove_price :id=>{
            const PRODUCT_PRICE_REMOVE_QUERY = "UPDATE product_price SET status = ? , date = ? WHERE price_id = ? ";
            return new Promise((resolve,reject)=>{
                pool.query(PRODUCT_PRICE_REMOVE_QUERY,[0,localTime,id],(err,results)=>{
                    if(err) reject(err);
                    resolve(results);
                })
            })
           
           },
           get_price:_=>{
               const PRICES ='SELECT price,price_id FROM product_price WHERE status=1';
               return new Promise((resolve,reject)=>{
                pool.query(PRICES,(err,results)=>{
                    if(err) reject(err);
                    resolve(results);
                })
            })
           },
           new_price:_=>{
            const PRICES ='SELECT p.product_name,price.price FROM product AS p INNER JOIN product_price AS price WHERE p.id=price.product_id AND p.status=1 AND price.status=1';
            return new Promise((resolve,reject)=>{
             pool.query(PRICES,(err,results)=>{
                 if(err) reject(err);
                 resolve(results);
             })
         })
        },
        old_price:_=>{
            const PRICES ='SELECT p.product_name,price.price FROM product AS p INNER JOIN product_price AS price WHERE p.id=price.product_id AND p.status=0 AND price.status=0';
            return new Promise((resolve,reject)=>{
             pool.query(PRICES,(err,results)=>{
                 if(err) reject(err);
                 resolve(results);
             })
         })
        }
 
}
module.exports = PRODUCT_PRICE_MODEL.prototype