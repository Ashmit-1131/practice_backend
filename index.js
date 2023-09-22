const express=require("express")
const cors=require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send({
        message:"Welcome to the backend server",
        status:1,
        error:false
    })
})

app.use("/user",userRouter)

app.listen(process.env.port,async()=>{
    try{
      await connection
      console.log("connected to db")
    }catch(err){
        console.log(err)
    }
    console.log("Running on the port",process.env.port)
})