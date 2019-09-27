const pool = require('../DbConnection/db');
const SELECT_ALL_PRODUCT ='SELECT * FROM product';
const moment = require('moment');
const localTime = moment().format('YYYY-MM-DD HH:mm:ss');
let  PRODUCT_MODEL = () => {

};
PRODUCT_MODEL.prototype = {
      
    // get_category:_ =>{
    //     return new Promise((resolve,reject)=>{
    //       pool.query(SELECT_ALL_CATEGORY,(err,resu     lt)=>{
    //           if(err) reject(err);
    //            else resolve(result);
    //         });
    //     })
    //   },
    add_product:(body,file)=>{

        const product_data = body;
        const INSERT_PRODUCT_QUERY = `INSERT INTO product (product_name,product_image,category_id,status,date) VALUES('${product_data.prod_name}','${file.filename}','${product_data.category_id}',1,'${localTime}')`;
      
           return new Promise((resolve,reject)=>{
               pool.query(INSERT_PRODUCT_QUERY,(err,result)=>{
                   //console.log(result);
                   if(err) reject(err);
                    resolve(result);
               })
           })
        },
        edit_product:(id,body,file)=>{
            const PRODUCT_EDIT_QUERY = "UPDATE product SET product_name = ?,product_image = ?,category_id = ?,date = ? WHERE id = ? ";
            return new Promise((resolve,reject)=>{
             pool.query(PRODUCT_EDIT_QUERY,[body.product_name,file.filename,body.category_id,localTime,id],(err,results)=>{
                 if(err) reject(err);
                 resolve(results);
                 
             })
            })
        },
        get_product:_=>{
            const GET_PRODUCT_BY_ACTIVE_STATUS = 'SELECT promo.amount,p.product_name,c.category_lists,price.price FROM product as p INNER JOIN category as c ON p.category_id = c.category_id INNER JOIN product_price as price ON p.id=price.product_id INNER JOIN promotion as promo ON p.id=promo.product_id WHERE p.status=2 AND c.status=1 AND price.status=1 AND MONTH(promo.start_date)=MONTH(CURDATE()) AND MONTH(promo.end_date)>=MONTH(CURDATE())';
            return new Promise((resolve,reject)=>{
                    pool.query(GET_PRODUCT_BY_ACTIVE_STATUS,(err,result)=>{
                        if(result.length > 0){
                           var value = [];
                          result.map(element=>{
                           const ori_price = element.price
                           //string to integer
                           const discount= parseInt(element.amount,10)*ori_price/100;
                           const sales_price = ori_price-discount;
                            value.push(sales_price);
                          })
                          result.value = value
                          if(err) reject(err);
                          resolve(result);
                        }
                        else{
                            const message="no contents to be shown"
                            resolve(message);
                        }
                          
                      
                     });
            
               
              })
        },

        no_discount_product:_=>{
            const NO_DISCOUNT_VALUE_QUERY = 'SELECT p.id,p.product_name,c.category_lists,price.price FROM product as p INNER JOIN category as c ON p.category_id = c.category_id INNER JOIN product_price as price ON p.id= price.product_id WHERE p.status=1 and c.status=1 and price.status=1';
                   
                  return new Promise((resolve,reject)=>{
                    pool.query(NO_DISCOUNT_VALUE_QUERY,(err,result)=>{
                        console.log(result);
                    var value = [];
                    result.map(element=>{
                    const ori_price = element.price
                    const discount= 0.00
                    const sales_price = ori_price-discount;
                    value.push(sales_price);
                    })
                    result.value = value
                    if(err) reject(err);
                    resolve(result);
                    })
            })
            
        }




    

    


}
module.exports = PRODUCT_MODEL.prototype