const pool = require('../DbConnection/db');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const localTime = moment().format('YYYY-MM-DD HH:mm:ss');
const SELECT_ALL_USERS ='SELECT * FROM user';
const key = 'mynewkey';
const status = 1;
let USER_MODEL = () => {};
USER_MODEL.prototype = {
// get_users:callback=>{
// pool.query(SELECT_ALL_USERS,(err,res)=>{
//     if(err) throw error;
//     callback(res)
// });
// },
    
   login_user:body=>{
     let logged_in_user = {
         _name:body.name,
         _pass:body.pass,
         _id:body.user_id
    
     }
     
   
      const GET_USER_SAME_NAME_AND_PASS = `SELECT * FROM user WHERE name='${logged_in_user._name}' AND password='${logged_in_user._pass}' AND id=${logged_in_user._id}`;
      return new Promise((resolve,reject)=>{
        pool.query(GET_USER_SAME_NAME_AND_PASS,(err,user)=>{
          console.log(user[0].id);
          const roles =`SELECT * FROM role WHERE user_id=${user[0].id}`;
         pool.query(roles,(err,role)=>{
           //jwt properties
        const options ={expiresIn:'2d',issuer:'restaurant.com:5005/'};
        const playload ={user_id:role[0].user_id,role:role[0].role};
        //jwt token
        let token = jwt.sign(playload,`${key}`,options);
        user.token = token;
            if(err) reject();
            resolve(user);
         })
          
        })
        
    })

   },
  
     add_user:body=>{
         //requested data
       let user_info = {
           _name:body.name,
           _age:body.age,
           _address:body.address,
           _pass:body.password,
           _confirm_password:body.con_password
           
       }
       
       //jwt token   
       //const token =jwt.sign({name:user_info._name},'mynewkey',{expiresIn:"50s"});
       
       
          const INSERT_USER_QUERY = `INSERT INTO user (name,age,address,password,confirm_pass,status,date)
                                  VALUES('${user_info._name}','${user_info._age}','${user_info._address}','${user_info._pass}','${user_info._confirm_password}'
                                  ,'${status}','${localTime}')`;

        return new Promise((resolve,reject)=>{
         pool.query(INSERT_USER_QUERY,(err,result)=>{
             //console.log(result);
             if(err) reject(err);
              resolve(result);
         })
        // authToken =()=>{
        //     return token
        // }
     })                          
    
    
   }
   
}
module.exports =  USER_MODEL.prototype