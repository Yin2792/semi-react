const pool = require('../DbConnection/db');
const SELECT_ALL_DISCOUNT ='SELECT * FROM promotion';
const moment = require('moment');
const next_month= moment().add(1,'month').format("MM");
const this_month = moment().format("MM");
let  DISCOUNT_MODEL = () => {};
DISCOUNT_MODEL.prototype = {
   
    get_discount:()=>{
        
        const GET_THIS_MONTH_QUERY ="SELECT promo.*,p.product_name FROM promotion as promo INNER JOIN product as p ON promo.product_id = p.id where p.status=2 and MONTH(promo.start_date)=MONTH(CURDATE()) AND MONTH(promo.end_date)>=MONTH(CURDATE())";
        const GET_NEXT_MONTH_QUERY=`SELECT * FROM promotion WHERE MONTH(start_date) = ${next_month}`;
        return new Promise((resolve,reject)=>{
            pool.query(GET_THIS_MONTH_QUERY,(err,this_month)=>{
                if(err) reject(err)
                    if(this_month.length > 0){
                        resolve(this_month)
                    }
                    else{
                        pool.query(GET_NEXT_MONTH_QUERY,(err,next_month)=>{
                            if(err) reject(err)
                            resolve(next_month)
                        })
                    }
                })
        })
        
       
    },
    
    add_discount :body=>{
        let discount_data = {
            promo_name:body.promo_name,
            promo_type:body.promo_type,
            _amount:body.amount,
            _id:body.prod_id,
            start_date:body.start_date,
            end_date:body.end_date,
            status:[2,3]


        }
        const month = moment(discount_data.start_date).format("MM");
        const INSERT_DISCOUNT_QUERY = `INSERT INTO promotion (promo_name,promo_type,amount,product_id,start_date,end_date) VALUES('${discount_data.promo_name}','${discount_data.promo_type}','${discount_data._amount}','${discount_data._id}','${discount_data.start_date}','${discount_data.end_date}')`;
        const status_change ='UPDATE product SET status =? WHERE id = ?';
           return new Promise((resolve,reject)=>{
               if(month == this_month){
                pool.query(status_change_1,[discount_data.status[0],discount_data._id],(err,status)=>{
                    console.log(status);
                    pool.query(INSERT_DISCOUNT_QUERY,(err,result)=>{
                        //console.log(result);
                        if(err) reject(err);
                         resolve(result);
                    })
                })
                 }
                 else{
                    pool.query(status_change_1,[discount_data.status[1],discount_data._id],(err,status)=>{
                        console.log(status);
                        pool.query(INSERT_DISCOUNT_QUERY,(err,result)=>{
                            //console.log(result);
                            if(err) reject(err);
                             resolve(result);
                        })
                    })
                 }
               
           })
        },
    edit_discount:(id,body)=>{
            const DISCOUNT_EDIT_QUERY = "UPDATE promotion SET promo_name = ?,promo_type = ? ,amount = ?,product_id = ? ,start_date = ?,end_date =? WHERE promo_id = ? ";
            return new Promise((resolve,reject)=>{
             pool.query(DISCOUNT_EDIT_QUERY,[body.promo_name,body.promo_type,body.amount,body.prod_id,body.start_date,body.end_date,id],(err,results)=>{
                 if(err) reject(err);
                 resolve(results);
                 
             })
            })
        },

}
module.exports = DISCOUNT_MODEL.prototype