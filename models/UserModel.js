const mongoose=require("mongoose")

const Userschema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
}
,
{
    versionKey:false
}
)

const UserModel=mongoose.model("user",Userschema)

module.exports={
    UserModel
}