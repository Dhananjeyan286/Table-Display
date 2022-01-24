const mongoose=require("mongoose")

const user_model=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    hobbies:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const users=mongoose.model("users",user_model)
module.exports=users