const discount_model = require('../model/DiscountModel');

let DISCOUNT_CONTROLLER = () => {};

DISCOUNT_CONTROLLER.prototype ={
    discount_get:(req,res,next)=>{
     const promise = discount_model.get_discount();
     promise.then(data=>{
            res.send({
             status:true,
             message:"Discount Lists",
             result:data
         })
     })
    },
    
     discount_add:(req,res,next)=>{
        //console.log(req.body.user);
        //like these object,have to be typed in postman
            const {promo_name,promo_type,amount,prod_id,start_date,end_date} = req.body;
             //console.log(req.body);
             const promise = discount_model.add_discount(req.body);
              promise.then(data =>{
                  res.send({
                     status:true, 
                     result:data
                    });
              })
              .catch(err=>console.log(err));
        
    },
    discount_edit :(req,res,next)=>{
        const id = req.params.id;
        const {promo_name,promo_type,amount,prod_id,start_date,end_date} = req.body;
        const promise = discount_model.edit_discount(parseInt(id),req.body);
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

}
module.exports = DISCOUNT_CONTROLLER.prototype