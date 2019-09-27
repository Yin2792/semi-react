
const errorHandler = (err,req,res,next)=>{

    if(typeof (err) === 'string'){
        return res.status(400).send({message:err})
    }
    if(err.name === 'UnauthorizedError'){
        return res.status(401).send({message:"invalid token!plz there must have token in headers"});
    }
    return res.status(500).send({message:err.message})
}
module.exports = errorHandler