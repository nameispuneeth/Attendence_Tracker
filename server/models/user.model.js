const mongoose=require("mongoose");

const User=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    startDate:{type:Date},
    TimeTable:{type:String},
    CurrAttendence:{type:String},
    RequiedAttendence:[{
        attendence:String,
        overAll:Boolean
    }]
},{collection:'User-Data'});

const model=mongoose.model("User",User);
module.exports=model;
