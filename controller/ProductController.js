const product_model = require('../model/ProductModel');
//image upload
const upload = require('../route/ImageUpload');

let PRODUCT_CONTROLLER = () => {};

PRODUCT_CONTROLLER.prototype = {
    
    


    product_add:(req,res,next)=>{

        const {prod_name,category_id} = req.body;
       try {
           upload(req,res,(err)=>{
           if(err) res.send({
                   message:err
               })
             else{
               if(req.file == undefined){
                  res.send({
                      message:"You have to choose at least one photo"
                  })
               }
               else{
                const promise = product_model.add_product(req.body,req.file);
             console.log(req.body);
                  promise.then(data =>{
                  res.send({
                     status:true,
                     message:"You have added successfully",
                     result:data
                    });
              })
              .catch(err=>console.log(err));
               }
            
           }
           
       })
    }catch(err){
        console.log(err);
    }
    
    },
    product_edit :(req,res,next)=>{
    const id = req.params.id;
   
    try {
        upload(req,res,(err)=>{
        if(err) res.send({
                message:err
            })
          else{
            if(req.file == undefined){
               res.send({
                   message:"You have to choose at least one photo"
               })
            }
            else{
                
                const {product_name,category_id} = req.body;
                const promise = product_model.edit_product(parseInt(id),req.body,req.file);
                 promise.then(data=>{
                     console.log(data);
                     res.send({
                         status:true,
                         message:`You have updated at id = ${id}`,
                         result:data
                     })
                     .catch(err=>console.log(err));
                 })
            }
         
        }
        
      })
    }catch(err){
     console.log(err);
    }
    
   },
   product_get:(req,res,next)=>{
    var promise = product_model.get_product();
    promise.then(result=>{
      return res.json({
        message:"product lists by active status",
        data:result,
        amount:result.value
      });
    }).catch(err=>res.send(err));
   },
   product_no_discount:(req,res,next)=>{
    var promise = product_model.no_discount_product();
    promise.then(result=>{
      return res.json({
        message:"product lists by no discount value",
        data:[result,result.value]
        
      });
    }).catch(err=>res.send(err));
   }
  }
module.exports = PRODUCT_CONTROLLER.prototype