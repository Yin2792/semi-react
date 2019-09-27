const user_model = require('../model/UserModel');
let USER_CONTROLLER = () => {};

USER_CONTROLLER.prototype = {
     
//     user_getall:(req,res,next)=>{
        
//         user_model.get_users((err,result)=>{
          
//           if(err) res.send(err);
//           else{
//           return res.json({
//               data:result
//           })
//         }
//         })
     
//     },
    user_login:(req,res,next)=>{
       const {name,pass,user_id} = req.body;
       console.log(req.body.name);
       const promise = user_model.login_user(req.body);
     
       promise.then(data=>{
            if(data[0] && data.token){
                 res.send({
                      success:true,
                       messsage:"successfully logged in",
                       token:data.token,
                       result:data
                 })
             }
            else{
                 res.status(403).send({
                      success:false,
                      token:null,
                      message:"Incorrect name and password!Try again!",

                 })
            }
       })
    },

    user_add:(req,res,next)=>{
         const {name,age,address,password,con_password} = req.body;
         if(req.body.name == undefined || req.body.age == undefined || req.body.address == undefined || req.body.password == undefined || req.body.con_password == undefined){
          res.send({
               status:1,
               message:"file cannot be empty"
          })
        }
      
       else if(req.body.password !== req.body.con_password){
           res.send({
                status:2,
                message:"password not match"
           })
       }
          else if(req.body.password !== req.body.con_password){
               res.send({
                    message:"password not match"
               })
          }
          else{
               const promise= user_model.add_user(req.body);
         //function call
         //const token = authToken.call()
         //console.log(token);
            promise.then(data=>{
                res.send({
                   status:true,
                   result:data,
                   message:"you have added successfully"
                   //token
                  });
            })
            .catch(err=>console.log(err));
          }
         
          
    }
     
}

module.exports = USER_CONTROLLER.prototype;
