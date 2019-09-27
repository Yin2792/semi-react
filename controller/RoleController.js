const role_model = require('../model/RoleModel');
let ROLE_CONTROLLER = () =>{};
ROLE_CONTROLLER.prototype = {

    role_add:((req,res,next)=>{

        const role_name = req.body;
        const promise_role = role_model.add_role(req.body);
        promise_role.then(data=>{
            res.send({
                status:true,
                message:"you have added successfully",
                result:data,
            })
        })
        .catch(err=>console.log(err));
         
    }),
    








}
module.exports = ROLE_CONTROLLER.prototype