const pool = require('../DbConnection/db');
const SELECT_ALL_TABLE ='SELECT * FROM table_seats';
const moment = require('moment');
const localTime = moment().format('YYYY-MM-DD HH:mm:ss');
// 0 is available and 1 is unavialable
let  TABLE_MODEL = () => {};
TABLE_MODEL.prototype = {

    get_table :_ =>{
        return new Promise((resolve,reject)=>{
          pool.query(SELECT_ALL_TABLE,(err,result)=>{

              if(err) reject(err);
               else resolve(result);
            });
        })
      },
      add_table:body=>{
        let table_data = body;
        const INSERT_TABLE_QUERY = `INSERT INTO table_seats (table_no,status,date) VALUES('${table_data.table_num}',0,'${localTime}')`;
      
           return new Promise((resolve,reject)=>{
               pool.query(INSERT_TABLE_QUERY,(err,result)=>{
                   //console.log(result);
                   if(err) reject(err);
                    resolve(result);
               })
           })
        },
        edit_table :(id,body)=>{
            const TABLE_EDIT_QUERY = "UPDATE table_seats SET table_no = ?,date = ? WHERE table_id = ? ";
            return new Promise((resolve,reject)=>{
             pool.query(TABLE_EDIT_QUERY,[body.table_num_1,localTime,id],(err,results)=>{
                 if(err) reject(err);
                 console.log(body.table_num_1);
                 resolve(results);
                 
             })
            })
        },
        check_table :id =>{
            console.log(id);
           const TABLE_CHECK_QUERY = "UPDATE table_seats SET status = ? , date = ? WHERE table_id = ? ";
           return new Promise((resolve,reject)=>{
               pool.query(TABLE_CHECK_QUERY,[1,localTime,id],(err,results)=>{
                   if(err) reject(err);
                   resolve(results);
               })
           })
          
          }





}
module.exports =TABLE_MODEL.prototype