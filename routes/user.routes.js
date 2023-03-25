const express = require("express")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRoute = express.Router()
const {UserModel} = require("../model/user.model")

//signup
userRoute.post("/register",async(req,res)=>{
    const {email,password,location,age} = req.body
    try {
        bcrypt.hash(password,5, async (err, hash)=> {
            const user  = new UserModel({email,password:hash,location,age})
            await user.save()
            res.status(200).send({"msg":"Registration completed"})
        });

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//login
userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user =await UserModel.findOne({email})
       if(user){
        bcrypt.compare(password, user.password, (err, result) =>{
            if(result){
                res.status(200).send({"msg":"Login Successfull","token":jwt.sign({"userID":user._id},"masai")})

            }
            else{
                res.status(400).send({"msg":"Wrong Password"})
            }
        });
       }else{
        res.status(400).send({"msg":"User Not found"})
       }
       
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


module.exports = {userRoute}




