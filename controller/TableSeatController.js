const table_model = require('../model/TableSeatModel');

let TABLE_CONTROLLER = () => {};
TABLE_CONTROLLER.prototype = {

    table_get:(req,res,next)=>{
        var promise = table_model.get_table();
        console.log(promise);
        promise.then(result=>{
          return res.json(result);
        }).catch(err=>res.send(err));
    },
    table_add:(req,res,next)=>{
        //console.log(req.body.user);
        //like these object,have to be typed in postman
            const {table_num} = req.body;
             //console.log(req.body);
             const promise = table_model.add_table(req.body);
              promise.then(data =>{
                  res.send({
                     status:true, 
                     result:data
                    });
              })
              .catch(err=>console.log(err));
        
    },
    table_edit :(req,res,next)=>{
        const id = req.params.id;
        const {table_num_1} = req.body;
        const promise = table_model.edit_table(parseInt(id),req.body);
         promise.then(data=>{
             console.log(data);
             res.send({
                 status:true,
                 message:`You have updated at id = ${id}`,
                 result:data
             })
             .catch(err=>console.log(err));
         })
    },
    table_check :(req,res,next)=>{
        const check_id = req.params.id;
        const promise = table_model.check_table(check_id);
        console.log(promise);
        promise.then(data=>{
            res.send({
                 message:"your selected table is currently unavailable",
                 result:data
            })
       })
       .catch(err=>res.send(err));
     
     }

}
module.exports = TABLE_CONTROLLER.prototype