const express=require("express");
const { UserModel } = require("../models/UserModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const userRouter=express.Router()



userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            res.send({
                message:"User already registered",
                status:0,
                error:true
            })
            return
        }
        const hash=await bcrypt.hash(password,5)//salt round 5
    const user=new UserModel({name,email,password:hash})
    await user.save()
    res.send({
        message:"user successfully registered",
        status:1,
        error:false

    })
    }catch(err){
      res.send({
        message:"Something went wrong "+err,
        status:0,
        error:true
      })
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(!user){
            res.send({
                message:"User not found",
                status:0,
                error:false
            })
            return
        }
        const compare=await bcrypt.compare(password,user.password)
        if(compare){
            const token=jwt.sign({userId:user._id},process.env.secretKey)
            res.send({
                message:"Login successfully",
                status:1,
                id:user._id,
                name:user.name,
                email:user.email,
                password:user.password,
                token:token,
                error:false
            })
        }else{
            res.send({
                message:"Password do not match",
                status:0,
                error:true
            })
        }

    }catch(err){
     res.send({
        message:"Something went wrong "+err,
        status:0,
        error:true
     })
    }
})


module.exports={
    userRouter
}