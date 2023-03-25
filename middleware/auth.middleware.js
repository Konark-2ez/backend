const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
//logic
   const token = req.headers.authorization.split(" ")[1]
   if(token){
   const decoded =  jwt.verify(token,"masai")
   if(decoded){
      req.body.userID=  decoded.userID
     
    next()
   }else{
    res.status(400).send({"msg":"Please login first"})
   }
   }
   else{
    res.status(400).send({"msg":"Please login first"})
   }
}

module.exports = {auth}