const price_model = require('../model/PriceModel');

let PRICE_CONTROLLER = () => {};
PRICE_CONTROLLER.prototype ={

    price_add:(req,res,next)=>{

        const {price,product_id,status} = req.body;
           //console.log(req.body);
           const promise = price_model.add_price(req.body);
            promise.then(data =>{
                res.send({
                   status:true, 
                   result:data
                  });
            })
            .catch(err=>console.log(err));
    },
    price_edit :(req,res,next)=>{
        const id = req.params.id;
        const {new_price,new_product_id} = req.body;
        const promise = price_model.edit_price(parseInt(id),req.body);
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
    price_remove :(req,res,next)=>{
        const removed_id = req.params.id;
        console.log(removed_id);
        const promise = price_model.remove_price(removed_id);
        console.log(promise);
        promise.then(data=>{
            res.send({
                 message:"your selected category has been removed",
                 result:data
            })
       })
       .catch(err=>res.send(err));
     
     },
     price_get:(req,res,next)=>{
         const promise = price_model.get_price();
         promise.then(data=>{
            res.send({
                 message:"price lists",
                 result:data
            })
       })
       .catch(err=>res.send(err));
     },
     price_new:(req,res,next)=>{
        const promise = price_model.new_price();
        promise.then(data=>{
           res.send({
                message:"price new lists",
                result:data
           })
      })
      .catch(err=>res.send(err));
    },
    price_old:(req,res,next)=>{
        const promise = price_model.old_price();
        promise.then(data=>{
           res.send({
                message:"price old lists",
                result:data
           })
      })
      .catch(err=>res.send(err));
    },
     


}
module.exports = PRICE_CONTROLLER.prototype