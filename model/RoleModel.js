const pool = require('../DbConnection/db');
const SELECT_ALL_role ='SELECT * FROM role';

const moment = require('moment');
const localTime = moment().format('YYYY-MM-DD HH:mm:ss');
let ROLE_MODEL = ()=>{}
ROLE_MODEL.prototype = {
   add_role:body=>{
       let user_role = {
           _role:body.role_name
       }
       const SELECT_USER = 'SELECT id FROM user ORDER BY date DESC LIMIT 1';
       return new Promise((resolve,reject)=>{
        pool.query(SELECT_USER,(err,user)=>{
        const id = user[0].id;
        const role = `INSERT INTO role (role,user_id) VALUES('${user_role._role}','${id}')`;
        pool.query(role,(err,roles)=>{
            if(err) reject(err)
            resolve(roles);
        })

        })
       })
   }
   

}
module.exports = ROLE_MODEL.prototype