var mongoose = require('mongoose')
var userSchema=mongoose.Schema({
    avatar:{
        type:String
    },
    name:{
        required:[true,'Please enter name'],
        type:String
    },
    email:{
        required:[true,'Please enter email'],
        type:String
    },
  
    password:{
        required:[true,'Please enter password'],
        type:String
    },
},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema,"users")