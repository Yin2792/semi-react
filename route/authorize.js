const expressJwt = require('express-jwt');
const verifyToken =(roles=[])=>{
if(typeof roles === 'string'){
    roles = [roles]
    console.log(roles);
}
return [
    expressJwt({secret: 'mynewkey'}),
    (req,res,next)=>{
        if(roles.length && !roles.includes(req.user.role)){
            return res.status(401).send({
                message:"you have no permission to access that route!unauthorized"
            })
        }
        next()
    }
]
}
module.exports = verifyToken